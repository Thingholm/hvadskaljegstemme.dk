variable "project" {
  type    = string
  default = "hvadskaljegstemme"
}

variable "environment" {
  type = string
}

variable "vpc_id" {
  type    = string
  default = "vpc-0c214eb2951fd87b9"
}

variable "aws_region" {
  type    = string
  default = "eu-north-1"
}

variable "public_subnet_1a_id" {
  type    = string
  default = "subnet-0cabfd4db0a0989ca"
}

variable "domain_name" {
  type    = string
  default = "hvadskaljegstemme.dk"
}