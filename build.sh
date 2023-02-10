if [ $# -eq 0 ]
  then   
    echo "No arguments supplied"    
    exit 1
fi
ECR_ENDPOINT=863203846708.dkr.ecr.us-west-2.amazonaws.com
ECR_REPO_NAME=billing-dataplatform
aws ecr get-login-password --region us-west-2 | docker login --username AWS --password-stdin $ECR_ENDPOINT
docker build -t $ECR_REPO_NAME .
docker tag $ECR_REPO_NAME:latest $ECR_ENDPOINT/$ECR_REPO_NAME:$1
docker push $ECR_ENDPOINT/$ECR_REPO_NAME:$1
