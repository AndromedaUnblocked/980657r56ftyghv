#This file is for requiring all the gems and other files (imported once in ./main.rb)
require 'sinatra'
require 'sinatra/content_for'
require 'config'
require 'colorize'
require 'securerandom'
require 'encrypted_cookie'
require 'rack/csrf'
require 'rack/reverse_proxy'
require 'dry/schema'
require 'dry/validation'
require 'yaml'
require './ruby/utils.rb'
require './ruby/uv.rb'
require './ruby/auth.rb'
require './ruby/yamlValidator.rb'