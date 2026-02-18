variable "project" {
  type        = string
  default     = "hvadskaljegstemme"
}

variable "environment" {
  type        = string
}

variable "vpc_id" {
  type        = string
  default     = "vpc-0c214eb2951fd87b9"
}

variable "aws_region" {
  type    = string
  default = "eu-north-1"
}