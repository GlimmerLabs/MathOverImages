#!/usr/bin/bash
# make_dev_database.sh
# Alex Mitchell '17
# Glimmer Labs Summer 2014


echo "Please Enter the Mist MySQL root password three times."

# Download Datadump, prompt for remote password
/usr/local/mysql/bin/mysqldump -hglimmer.grinnell.edu -uroot -p mist -rmist_cloned_database.sql

# Clean old database, make new database
/usr/local/mysql/bin/mysql -uroot -p -hglimmer.grinnell.edu<<END
  DROP DATABASE IF EXISTS mist_dev;
  CREATE DATABASE mist_dev;
END
# Import fresh database
/usr/local/mysql/bin/mysql -uroot -hglimmer.grinnell.edu -p mist < mist_cloned_database.sql
rm mist_cloned_database.sql
echo "Complete"
