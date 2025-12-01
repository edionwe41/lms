import time
import requests

BASE = "http://127.0.0.1:8000"


def wait_for_server(timeout=15):
    for _ in range(timeout):
        try:
            r = requests.get(BASE + "/")
            if r.status_code == 200:
                print("Server ready")
                return True
        except Exception:
            pass
        time.sleep(1)
    print("Server did not become ready")
    return False


def register(username, password, full_name, role=None):
    payload = {"username": username, "password": password, "full_name": full_name}
    if role:
        payload["role"] = role
    r = requests.post(BASE + "/auth/register", json=payload)
    print("REGISTER", username, r.status_code, r.text)
    return r


def login(username, password):
    r = requests.post(BASE + "/auth/login", json={"username": username, "password": password})
    print("LOGIN", username, r.status_code, r.text)
    if r.status_code == 200:
        return r.json().get("access_token")
    return None


def add_book(token, title, author, isbn):
    headers = {"Authorization": f"Bearer {token}"}
    payload = {"title": title, "author": author, "isbn": isbn, "total_copies": 1}
    r = requests.post(BASE + "/books/", json=payload, headers=headers)
    print("ADD BOOK", r.status_code, r.text)
    return r


def borrow_book(token, book_id):
    headers = {"Authorization": f"Bearer {token}"}
    r = requests.post(BASE + "/borrow/", json={"book_id": book_id}, headers=headers)
    print("BORROW", r.status_code, r.text)
    return r


def return_book(token, borrow_id):
    headers = {"Authorization": f"Bearer {token}"}
    r = requests.post(BASE + f"/borrow/return/{borrow_id}", headers=headers)
    print("RETURN", r.status_code, r.text)
    return r


def me(token):
    headers = {"Authorization": f"Bearer {token}"}
    r = requests.get(BASE + "/borrow/me", headers=headers)
    print("MY BORROWS", r.status_code, r.text)
    return r


def main():
    if not wait_for_server():
        return

    # create librarian and student
    register("librarian", "pass", "Lib", role="librarian")
    lib_token = login("librarian", "pass")

    register("student", "pass", "Stu", role="student")
    stu_token = login("student", "pass")

    # add a book with librarian
    ab = add_book(lib_token, "Smoke Book", "Tester", "SMK-001")
    book_id = None
    if ab.status_code == 200:
        book_id = ab.json().get("id")

    # borrow with student
    if book_id:
        br = borrow_book(stu_token, book_id)
        borrow_id = None
        if br.status_code == 200:
            borrow_id = br.json().get("id")

        # check my borrows
        me(stu_token)

        # return
        if borrow_id:
            return_book(stu_token, borrow_id)
            me(stu_token)


if __name__ == "__main__":
    main()
