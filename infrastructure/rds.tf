
resource "aws_db_instance" "db" {
  identifier = "${var.project}-${var.environment}"

  engine         = "postgres"
  engine_version = "18"

  instance_class    = "db.t4g.micro"
  allocated_storage = 10

  db_name                     = var.project
  username                    = "postgres"
  password                    = random_password.db_password.result

  backup_retention_period = 7
  backup_window           = "03:00-04:00"
  skip_final_snapshot     = true

  db_subnet_group_name   = aws_db_subnet_group.name.id
  publicly_accessible    = false
  multi_az               = false
  availability_zone      = "eu-north-1a"
  vpc_security_group_ids = [aws_security_group.rds.id]

}

resource "random_password" "db_password" {
  length           = 28
  special          = true
  override_special = "!#$%&*()-_=+[]{}<>?"
}

resource "aws_secretsmanager_secret" "db_password" {
  name = "${var.project}-${var.environment}-db-password"
}

resource "aws_secretsmanager_secret_version" "db_password" {
  secret_id     = aws_secretsmanager_secret.db_password.id
  secret_string = jsonencode({
    password = random_password.db_password.result
  })
}


resource "aws_db_subnet_group" "name" {
  name = "${var.project}-db-subnet-group"
  subnet_ids = [
    aws_subnet.private_1a.id,
    aws_subnet.private_1b.id
  ]
}

resource "aws_security_group" "rds" {
  name   = "${var.project}-${var.environment}-rds"
  vpc_id = var.vpc_id
}
