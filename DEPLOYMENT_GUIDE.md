# 🚀 Deployment Guide for NUS BREAD Website

## Quick Start Options

### Option 1: Deploy to Heroku (Easiest)

#### Prerequisites
- Heroku account (free tier available)
- Git installed
- MongoDB Atlas account (free tier)

#### Steps

1. **Create MongoDB Atlas Database**
   - Go to mongodb.com/cloud/atlas
   - Create free cluster
   - Get connection string

2. **Create Heroku App**
   ```bash
   heroku login
   heroku create nus-bread-bakery
   ```

3. **Set Environment Variables**
   ```bash
   heroku config:set MONGO_URI="mongodb+srv://username:password@cluster.mongodb.net/nus-bread-bakery"
   heroku config:set JWT_SECRET="your-very-secure-random-string-here"
   heroku config:set NODE_ENV=production
   heroku config:set CORS_ORIGIN="https://nus-bread-bakery.herokuapp.com"
   ```

4. **Deploy**
   ```bash
   git push heroku main
   ```

5. **View Logs**
   ```bash
   heroku logs --tail
   ```

### Option 2: Deploy to Render.com

1. Connect GitHub repository
2. Create new Web Service
3. Set Build Command: `npm install`
4. Set Start Command: `node server.js`
5. Add Environment Variables
6. Deploy

### Option 3: Deploy to Railway.app

1. Connect GitHub account
2. Create new project
3. Add MongoDB service
4. Deploy code
5. Auto-setup environment variables

### Option 4: Self-Hosted (VPS)

#### Using Ubuntu/DigitalOcean

1. **SSH into server**
   ```bash
   ssh root@your_server_ip
   ```

2. **Install Node.js & npm**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

3. **Install MongoDB**
   ```bash
   sudo apt-get install -y mongodb
   ```

4. **Clone Repository**
   ```bash
   git clone https://github.com/victoradeniyi02-cloud/nus-bread-bakery.git
   cd nus-bread-bakery
   npm install
   ```

5. **Setup PM2 (Process Manager)**
   ```bash
   sudo npm install -g pm2
   pm2 start server.js --name "nus-bread"
   pm2 startup
   pm2 save
   ```

6. **Setup Nginx Reverse Proxy**
   ```bash
   sudo apt-get install -y nginx
   ```
   
   Create `/etc/nginx/sites-available/nus-bread`:
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com www.yourdomain.com;

       location / {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```
   
   Enable site:
   ```bash
   sudo ln -s /etc/nginx/sites-available/nus-bread /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

7. **Setup SSL Certificate (Let's Encrypt)**
   ```bash
   sudo apt-get install -y certbot python3-certbot-nginx
   sudo certbot certonly --nginx -d yourdomain.com -d www.yourdomain.com
   ```

## Domain Setup

### Using a Custom Domain

1. **Register Domain** (Namecheap, GoDaddy, etc.)
2. **Add DNS Records**
   - For Heroku: Add CNAME pointing to `nus-bread-bakery.herokuapp.com`
   - For VPS: Add A record pointing to your server IP
3. **Update CORS_ORIGIN in .env**
   ```bash
   CORS_ORIGIN=https://yourdomain.com
   ```

## Database Backup

### MongoDB Atlas Auto Backup
- Enabled by default on free tier (7 days)
- Access in Atlas dashboard

### Manual Backup
```bash
mongodump --uri "mongodb+srv://username:password@cluster.mongodb.net/nus-bread-bakery" --out ./backup
```

## Monitoring & Maintenance

### View Logs
```bash
# Heroku
heroku logs --tail

# VPS with PM2
pm2 logs nus-bread
```

### Health Check
```bash
curl https://yourdomain.com/api/health
```

## Scaling

### Heroku
```bash
# Upgrade dyno
heroku dyos:resize web=standard-1x
```

### Multiple Instances
- Use load balancer (Nginx)
- Scale horizontally with multiple servers

## Security Checklist

- [x] Use HTTPS only
- [x] Set strong JWT_SECRET
- [x] Enable CORS restrictions
- [x] Use environment variables for secrets
- [x] Implement rate limiting
- [x] Regular security updates
- [x] Backup database regularly
- [x] Monitor error logs

## Troubleshooting

### MongoDB Connection Error
```bash
# Check connection string
# Verify IP whitelist in MongoDB Atlas
# Ensure MONGO_URI is set correctly
heroku config | grep MONGO_URI
```

### Port Already in Use
```bash
# Find process using port 5000
lsof -i :5000
# Kill process
kill -9 <PID>
```

### CORS Errors
```bash
# Update CORS_ORIGIN to match frontend URL
heroku config:set CORS_ORIGIN="https://frontend-url.com"
```

## Contact Support
- **Phone**: 09125836475
- **WhatsApp**: 07042668443
