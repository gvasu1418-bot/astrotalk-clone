from celery_app import celery


@celery.task
def send_welcome_email(email):

    print(
        f"Email sent to {email}"
    )