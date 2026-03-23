"""Test script to verify Google Gemini API key and model."""
import os
import sys
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

api_key = os.getenv("GOOGLE_API_KEY")
model_name = os.getenv("AGENT_MODEL_NAME", "gemini-2.5-flash")

print("=" * 60)
print("GOOGLE GEMINI API CONNECTION TEST")
print("=" * 60)
print(f"API Key Present: {api_key is not None}")
print(f"API Key Length: {len(api_key) if api_key else 0}")
print(f"API Key Start: {api_key[:10] if api_key else 'None'}...")
print(f"Model Name: {model_name}")
print("=" * 60)

if not api_key or api_key == "YOUR_ACTUAL_GOOGLE_API_KEY_HERE":
    print("\n❌ ERROR: GOOGLE_API_KEY is not set!")
    print("\nSteps to get API key:")
    print("1. Go to: https://aistudio.google.com/apikey")
    print("2. Sign in with Google account")
    print("3. Click 'Create API Key'")
    print("4. Copy the key")
    print("5. Paste it in backend/.env file:")
    print('   GOOGLE_API_KEY="your-actual-key-here"')
    sys.exit(1)

print("\n🔍 Testing API connection...")

try:
    from openai import OpenAI
    
    client = OpenAI(
        api_key=api_key,
        base_url="https://generativelanguage.googleapis.com/v1beta/openai/"
    )
    
    print("✓ OpenAI client created successfully")
    
    # Test the model
    print(f"\n📡 Testing model: {model_name}...")
    
    response = client.chat.completions.create(
        model=model_name,
        messages=[
            {"role": "user", "content": "Hello! Just testing the connection."}
        ],
        max_tokens=50
    )
    
    print("✓ API call successful!")
    print(f"\nResponse: {response.choices[0].message.content}")
    print("\n✅ SUCCESS! Your Google Gemini API key is working correctly!")
    print(f"✅ Model {model_name} is available and accessible!")
    
except Exception as e:
    print(f"\n❌ ERROR: {str(e)}")
    print("\nPossible issues:")
    print("1. Invalid API key - Check if you copied it correctly")
    print("2. API key not activated - Wait a few minutes after creating")
    print("3. Model name incorrect - Try 'gemini-2.5-flash' or 'gemini-3-flash'")
    print("4. Network issue - Check your internet connection")
    print("\nTroubleshooting:")
    print("- Verify API key at: https://aistudio.google.com/apikey")
    print("- Try alternative model: gemini-3-flash")
    sys.exit(1)

print("=" * 60)
