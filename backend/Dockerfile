# Stage 1: Dependencies
FROM python:3.10-slim AS deps

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir --user -r requirements.txt

# Stage 2: Application
FROM python:3.10-slim AS runner

WORKDIR /app

RUN addgroup --system --gid 1000 app
RUN adduser --system --uid 1000 app

COPY --from=deps /root/.local /home/app/.local
COPY --chown=app:app . .

ENV PATH=/home/app/.local/bin:$PATH
ENV PYTHONPATH=/app

USER app

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]