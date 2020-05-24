/* pm2 是带有负载均衡的 Node 应用的进程管理 */

module.exports = {
  apps: [{
    name: 'webserverapi',
    script: './bin/www', /* pm2 脚本文件 */
    cwd: './', /* 项目根目录 */
    args: '', /* 参数 */
    watch: true, /* 监听文件变动是否重启 */
    ignore_watch: ['node_modules', 'logs'], /* 不监听的文件 */
    exec_mode: 'cluster_mode', /* mode = cluster_mode | fork_mode */
    instances: 1, /* 进程实例数 */
    max_memory_restart: '1G', /* 进程内存数,超出则重启 */
    autorestart: true, /* 异常后重启 */
    error_file: './logs/app-error.log', /* 程序出错日志 */
    out_file: './logs/app-out.log', /* 程序正常日志 */
    log_date_format: 'YYYY-MM-DD HH:mm:ss', /* 日志时间格式 */
    
    /* 指定环境参数 process.env.NODE_ENV */
    env_test: {
      NODE_ENV: 'test',
      REMOTE_ADDR: ''
    },
    env_dev: {
      NODE_ENV: 'development',
      REMOTE_ADDR: ''
    },
    env_pro: {
      NODE_ENV: 'production',
      REMOTE_ADDR: ''
    }
  }]
}
