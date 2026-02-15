
resource "aws_db_instance" "db" {
  identifier           = "${var.project}-${var.environment}"
  
  engine               = "postgres"
  engine_version       = "18"

  instance_class       = "db.t4g.micro"
  allocated_storage    = 10

  db_name              = "${var.project}"
  username             = "postgres"
  manage_master_user_password = true

  backup_retention_period = 7
  backup_window = "03:00-04:00"
  skip_final_snapshot  = true

  db_subnet_group_name = aws_db_subnet_group.name.id
  publicly_accessible = false
  multi_az = false
  availability_zone = "eu-north-1a"
  
}

resource "aws_db_subnet_group" "name" {
  name        = "${var.project}-db-subnet-group"
  subnet_ids = [
    aws_subnet.private_1a.id,
    aws_subnet.private_1b.id
  ]
}