FROM python:3.11-slim

WORKDIR /app

# Copy index files (large but necessary)
COPY data/positional_indexes/ /app/data/positional_indexes/
COPY data/alphabetized_indexes/ /app/data/alphabetized_indexes/
COPY data/stats/ /app/data/stats/

# Copy backend code
COPY backend/ /app/backend/
COPY index_creation/ /app/index_creation/

# Install dependencies
COPY backend/requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Download NLTK data
RUN python -c "import nltk; nltk.download('punkt')"

# Set working directory to backend
WORKDIR /app/backend

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
