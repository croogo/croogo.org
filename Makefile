composer:
	curl -sS https://getcomposer.org/installer | php
	#php composer.phar install

npm:
	./Console/cake croogo aggregateManifestFile package.json
	npm install

bower:
	./Console/cake croogo aggregateManifestFile bower.json
	./node_modules/.bin/bower install --allow-root

build:
	./node_modules/.bin/grunt build

update:
	make npm
	make bower
	make composer
	make build

nginx:
	sudo cp /vagrant/etc/development/nginx/nginx.conf /etc/nginx/nginx.conf
	sudo cp /vagrant/etc/development/nginx/sites-enabled/croogo /etc/nginx/sites-enabled/croogo
	sudo service nginx restart

php:
	sudo cp /vagrant/etc/development/php5/fpm/php.ini /etc/php5/fpm/php.ini
	sudo cp /vagrant/etc/development/php5/fpm/php-fpm.conf /etc/php5/fpm/php-fpm.conf
	sudo /usr/sbin/php5-fpm -c /etc/php5/fpm/php-fpm.conf -t
	([ -x /etc/init.d/php5-fpm ] && sudo /etc/init.d/php5-fpm start)
	([ -x /etc/init.d/php5-fpm ] && sudo /etc/init.d/php5-fpm reload)
