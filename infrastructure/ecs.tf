resource "aws_ecs_cluster" "main" {
  name = "${var.project}-${var.environment}-api-ecs-cluster"

	setting {
    name  = "containerInsights"
    value = "enabled"
  }
}

resource "aws_iam_role" "ecs_task_execution_role" {
  name = "${var.project}-${var.environment}-ecs-task-execution-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Effect = "Allow",
      Principal = {
        Service = "ecs-tasks.amazonaws.com"
      },
      Action = "sts:AssumeRole"
    }]
  })
}

resource "aws_iam_role" "ecs_task_role" {
  name = "${var.project}-${var.environment}-ecs-task-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Effect = "Allow",
      Principal = {
        Service = "ecs-tasks.amazonaws.com"
      },
      Action = "sts:AssumeRole"
    }]
  })
}

resource "aws_iam_role_policy_attachment" "ecs_task_execution_role_policy" {
  role       = aws_iam_role.ecs_task_execution_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

resource "aws_cloudwatch_log_group" "api" {
  name              = "/ecs/${var.project}-${var.environment}-api"
  retention_in_days = 30
}

resource "aws_ecs_task_definition" "api" {
	family 									 = "${var.project}-${var.environment}-api"
	network_mode 						 = "awsvpc"
	requires_compatibilities = ["FARGATE"]
	cpu                      = 256
  memory                   = 512
	execution_role_arn 			 = aws_iam_role.ecs_task_execution_role.arn
  task_role_arn            = aws_iam_role.ecs_task_role.arn

  runtime_platform {
    operating_system_family = "LINUX"
    cpu_architecture        = "ARM64"
  }

	container_definitions = jsonencode([
		{
			name 			= "${var.project}-${var.environment}-api"
      image     = "${aws_ecr_repository.api.repository_url}:latest"
			essential = true
			portMappings = [
				{
					containerPort = 8080
					protocol			= "tcp"
				}
			]
			logConfiguration = {
        logDriver = "awslogs"
        options = {
          awslogs-group         = aws_cloudwatch_log_group.api.name
          awslogs-region        = var.aws_region
          awslogs-stream-prefix = "ecs"
        }
      }
		}
	])
}

resource "aws_security_group" "alb" {
	name   = "${var.project}-${var.environment}-alb"
  vpc_id = var.vpc_id

	ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    prefix_list_ids = [data.aws_ec2_managed_prefix_list.cloudfront.id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_security_group" "ecs_api" {
  name   = "${var.project}-${var.environment}-ecs-api"
  vpc_id = var.vpc_id

  ingress {
    from_port       = 8080
    to_port         = 8080
    protocol        = "tcp"
    security_groups = [aws_security_group.alb.id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_lb" "api" {
  name               = "${var.project}-${var.environment}-api"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb.id]
  subnets            = [data.aws_subnet.public_1a.id, data.aws_subnet.public_1b.id]
}

resource "aws_lb_target_group" "api" {
  name        = "${var.project}-${var.environment}-api"
  port        = 8080
  protocol    = "HTTP"
  vpc_id      = var.vpc_id
  target_type = "ip"

  health_check {
    path = "/api/health"
  }
}

resource "aws_lb_listener" "api" {
  load_balancer_arn = aws_lb.api.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.api.arn
  }
}

resource "aws_ecs_service" "api" {
	name 						= "${var.project}-${var.environment}-api-ecs-service"
	cluster 				= aws_ecs_cluster.main.id
	task_definition = aws_ecs_task_definition.api.arn
	desired_count 	= 1
	launch_type 		= "FARGATE"

	network_configuration {
		subnets 				 = [aws_subnet.private_1a.id, aws_subnet.private_1b.id]
		security_groups  = [aws_security_group.ecs_api.id]
		assign_public_ip = false
	}

	load_balancer {
		target_group_arn = aws_lb_target_group.api.arn
		container_name 	 = "${var.project}-${var.environment}-api"
		container_port 	 = 8080
	}

	depends_on = [ aws_lb_listener.api ]
}