resource "aws_s3_bucket" "website" {
  bucket = "hsjs-website-${var.environment}"
}