terraform {

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
  }

  backend "s3" {
    bucket  = "hsjs-tfstate"
    key     = "base/prod.tfstate"
    region  = "eu-north-1"
    profile = "AdministratorAccess-278584440423"
  }
}

provider "aws" {
  region  = "eu-north-1"
  profile = "AdministratorAccess-278584440423"
}
