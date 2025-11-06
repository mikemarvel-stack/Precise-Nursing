const { exec } = require('child_process');
const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const cron = require('node-cron');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION || 'us-east-1'
});

class BackupManager {
  constructor() {
    this.backupDir = path.join(__dirname, '../backups');
    this.bucket = process.env.AWS_BACKUP_BUCKET;
    this.retentionDays = parseInt(process.env.BACKUP_RETENTION_DAYS) || 30;
    
    if (!fs.existsSync(this.backupDir)) {
      fs.mkdirSync(this.backupDir, { recursive: true });
    }
  }

  async createDatabaseBackup() {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `db-backup-${timestamp}.sql`;
    const filepath = path.join(this.backupDir, filename);

    return new Promise((resolve, reject) => {
      const dbUrl = process.env.DATABASE_URL;
      const command = `pg_dump "${dbUrl}" > "${filepath}"`;

      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error('Database backup failed:', error);
          reject(error);
        } else {
          console.log(`Database backup created: ${filename}`);
          resolve(filepath);
        }
      });
    });
  }

  async uploadToS3(filepath) {
    const filename = path.basename(filepath);
    const fileStream = fs.createReadStream(filepath);

    const uploadParams = {
      Bucket: this.bucket,
      Key: `backups/${filename}`,
      Body: fileStream,
      ServerSideEncryption: 'AES256'
    };

    try {
      const result = await s3.upload(uploadParams).promise();
      console.log(`Backup uploaded to S3: ${result.Location}`);
      fs.unlinkSync(filepath);
      return result;
    } catch (error) {
      console.error('S3 upload failed:', error);
      throw error;
    }
  }

  async performFullBackup() {
    try {
      console.log('Starting backup process...');
      const dbBackupPath = await this.createDatabaseBackup();
      await this.uploadToS3(dbBackupPath);
      console.log('Backup process completed successfully');
    } catch (error) {
      console.error('Backup process failed:', error);
      throw error;
    }
  }

  scheduleBackups() {
    cron.schedule('0 2 * * *', () => {
      console.log('Starting scheduled backup...');
      this.performFullBackup().catch(console.error);
    });
    console.log('Backup scheduler initialized - Daily backups at 2 AM');
  }
}

const backupManager = new BackupManager();

if (require.main === module) {
  backupManager.performFullBackup()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}

if (process.env.NODE_ENV === 'production') {
  backupManager.scheduleBackups();
}

module.exports = BackupManager;