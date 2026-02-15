
locals {
  s3_origin_id = "s3-origin"
}

resource "aws_cloudfront_distribution" "website" {
  enabled             = true
  price_class = "PriceClass_100"
  comment = "CloudFront distribution for ${var.project}-${var.environment}"

  origin {
    domain_name = aws_s3_bucket.website.bucket_regional_domain_name
    origin_id   = local.s3_origin_id
    origin_access_control_id = aws_cloudfront_origin_access_control.s3_oac.id
  }

  
  viewer_certificate {
    cloudfront_default_certificate = true
  }

  restrictions {
    geo_restriction {
        restriction_type = "none"
    }
  }

  default_cache_behavior {
    target_origin_id = local.s3_origin_id
    viewer_protocol_policy = "redirect-to-https"
    allowed_methods = ["GET", "HEAD"]
    cached_methods = ["GET", "HEAD"]
    cache_policy_id = aws_cloudfront_cache_policy.website_cache_policy.id

    function_association {
      event_type = "viewer-request"
      function_arn = aws_cloudfront_function.redirect_to_index_html.arn
    }

  }
}

resource "aws_cloudfront_origin_access_control" "s3_oac" {
    name = "s3-origin-access-control"
    origin_access_control_origin_type = "s3"
    signing_behavior = "always"
    signing_protocol = "sigv4"
}

resource "aws_cloudfront_function" "redirect_to_index_html" {
  name    = "redirect-to-index-html-${var.project}-${var.environment}"
  runtime = "cloudfront-js-2.0"
  code = <<EOF
    function handler(event) {
    var request = event.request;
    var uri = request.uri;

    if (
        !uri.startsWith('/api') &&
        !uri.includes('.')
    ) {
        request.uri = '/index.html';
    }

    return request;
    }
  EOF
}

resource "aws_cloudfront_cache_policy" "website_cache_policy" {
  name = "website-cache-policy-${var.project}-${var.environment}"
  default_ttl = 360
  min_ttl = 0
  max_ttl = 86400

  parameters_in_cache_key_and_forwarded_to_origin {
    cookies_config {
      cookie_behavior = "none"
    }
    headers_config {
      header_behavior = "none"
    }
    query_strings_config {
      query_string_behavior = "none"
    }
  }
}

data "aws_iam_policy_document" "cloudfront_s3_access" {
  statement {
    effect = "Allow"

    principals {
      type = "Service"
      identifiers = ["cloudfront.amazonaws.com"]
    }

    actions = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.website.arn}/*"]
    
    condition {
        test = "StringEquals"
        variable = "AWS:SourceArn"
        values = [aws_cloudfront_distribution.website.arn]
    }
  }
}

resource "aws_s3_bucket_policy" "website_policy" {
  bucket = aws_s3_bucket.website.id
  policy = data.aws_iam_policy_document.cloudfront_s3_access.json
}