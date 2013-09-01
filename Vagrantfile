Vagrant.configure("2") do |config|

  ##
  # Box
  #
  config.vm.box      = "precise64"
  config.vm.box_url  = "http://files.vagrantup.com/precise64.box"
  config.vm.hostname = "croogo"

  ##
  # Memory
  #
  config.vm.provider :virtualbox do |vb|
    vb.customize ["modifyvm", :id, "--memory", "768"]
  end

  ##
  # IP
  #
  config.vm.network :private_network, ip: "16.17.18.19"

  ##
  # Shared directories
  #
  config.vm.synced_folder Dir.pwd, "/vagrant", :nfs => true

  ##
  # Upgrade Chef
  #
  config.vm.provision :shell, :inline => "gem install chef --version 11.6 --no-rdoc --no-ri --conservative"

  ##
  # Chef
  #
  config.vm.provision :chef_solo do |chef|
    chef.cookbooks_path = ["cookbooks"]
    chef.add_recipe :apt
    chef.add_recipe "build-essential"
    chef.add_recipe "curl"
    chef.add_recipe "git"
    chef.add_recipe "mysql::server"
    chef.add_recipe "nginx"
    chef.add_recipe "nodejs"
    chef.add_recipe "php"
    chef.add_recipe "php-fpm"
    chef.add_recipe "phpunit"
    chef.add_recipe "users::sysadmins"
    chef.add_recipe "vim"
    chef.json = {
      :git => {
        :prefix => "/usr/local"
      },
      :mysql => {
        :server_root_password   => 'password',
        :server_repl_password   => 'password',
        :server_debian_password => 'password',
        :allow_remote_root      => true
      },
      :nginx => {
        :dir                => "/etc/nginx",
        :log_dir            => "/var/log/nginx",
        :binary             => "/usr/sbin/nginx",
        :user               => "www-data",
        :init_style         => "runit",
        :pid                => "/var/run/nginx.pid",
        :worker_connections => "1024"
      }
    }
  end

  config.vm.provision :shell, :inline => "cd /vagrant && make composer"
  config.vm.provision :shell, :inline => "cd /vagrant && make npm"
  config.vm.provision :shell, :inline => "cd /vagrant && make bower"
  config.vm.provision :shell, :inline => "cd /vagrant && make build"
  config.vm.provision :shell, :inline => "cd /vagrant && make nginx"
  config.vm.provision :shell, :inline => "cd /vagrant && make php"

  ##
  # Create database (move this to cookbook level)
  #
  config.vm.provision :shell, :inline => "mysql -uroot -ppassword -e 'create database if not exists croogo'"
  config.vm.provision :shell, :inline => "mysql -uroot -ppassword -e 'create database if not exists croogo_test'"

end
