#!/usr/bin/bash
# backup_database.sh
# Alex Mitchell '17
# Glimmer Labs Summer 2014

# Generate datename
filename=mist_backup_`date +"%Y_%m_%d"`.sql
echo $filename
# Dump Database
mysqldump -hlocalhost -uroot -p mist -r$filename

# Move Database to backups folder
mv $filename database_backups/$filename
