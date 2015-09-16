# wait-for-amqp

## Usage

Plain connection:

```bash
wait-for-amqp <host> <port> <login> <password> <timeout>
```

Passing config:

```bash
wait-for-amqp '{"host": "<host>", "port":<port>, "login":"<login>", "password": "<password>", "connectionTimeout": <timeout>}'
```