resource "aws_acm_certificate" "certificate" {
  provider          = aws.us_east_1
  domain_name       = var.domain_name
  validation_method = "DNS"

  subject_alternative_names = [
    "www.${var.domain_name}"
  ]

  lifecycle {
    create_before_destroy = true
  }
}

output "acm_validation_records" {
  value = aws_acm_certificate.certificate.domain_validation_options
}