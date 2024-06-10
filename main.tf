provider "aws" {
  region = var.region
}

resource "aws_instance" "example" {
  ami           = "ami-00beae93a2d981137"
  instance_type = var.instance_type
}

output "instance_id" {
  description = "The ID of the EC2 instance"
  value       = aws_instance.example.id
}

output "instance_public_ip" {
  description = "The public IP address of the EC2 instance"
  value       = aws_instance.example.public_ip
}

terraform {
  backend "remote" {
    organization = "ConestogaLabWork"

    workspaces {
      name = "ConestogaLabWorkspace"
    }
  }
}
