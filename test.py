import requests

BASE_URL = "http://localhost:5173"


def test_ping():
    r = requests.get(f"{BASE_URL}/ping")
    print("PING:", r.status_code, r.json())


def test_submit():
    params = {
        "name": "TestUser",
        "contact": "test@example.com",
        "content": "Hello from Python"
    }

    r = requests.get(f"{BASE_URL}/submit", params=params)

    print("SUBMIT STATUS:", r.status_code)

    try:
        print("RESPONSE:", r.json())
    except Exception:
        print("RAW RESPONSE:", r.text)


if __name__ == "__main__":
    test_ping()
    test_submit()