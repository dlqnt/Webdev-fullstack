"""
Flask: Using templates
"""

from setup_db import select_students, select_courses, select_grades, add_student, add_grade
import sqlite3, random
from flask import Flask, render_template, request, redirect, url_for, g, flash

app = Flask(__name__)


DATABASE = './database.db'


def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
    return db

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()


@app.route("/")
def index():
    # get the database connection
    conn = get_db()
    return render_template("index.html", 
                    # select_students executes SELECT SQL statement on database connetion
                    # returns list of students
                    students=select_students(conn),
                    courses=select_courses(conn))


# Add additional routes here.
@app.route("/students/<student_no>", methods=("POST", "GET"))
def student(student_no):
    conn = get_db()
    return render_template("student.html", grades=select_grades(conn), students=select_students(conn), courses=select_courses(conn), student_no = student_no)

@app.route("/course/<course_id>")
def course(course_id):
    conn = get_db()
    return render_template("course.html", grades=select_grades(conn), students=select_students(conn), courses=select_courses(conn),course_id = course_id)

@app.route("/add_student", methods=["POST","GET"])
def new_student():
    conn = get_db()
    if request.method == "POST":
        if request.form["name"] == "":
            return render_template("student_form_error.html")
        else:
            name = request.form["name"]
            render_template("add_student.html",addstudent = add_student(conn, random.randint(100000,999999), name))
            
            return redirect("/")
    else:
        return render_template("add_student.html")

@app.route("/add_grade_student/<student_no>", methods=["POST", "GET"])
def new_grade(student_no):
    conn = get_db()
    if request.method == "GET":
        return render_template("add_grade_student.html", grades=select_grades(conn), students=select_students(conn), courses=select_courses(conn), student_no = student_no)
    elif request.method == "POST":
        course_id = request.form["course"]
        student_no = student_no
        grade = request.form["grade"]
        

        render_template("add_grade_student.html", grades=select_grades(conn), students=select_students(conn), courses=select_courses(conn), student_no = student_no, addgrade = add_grade(conn, course_id, student_no, grade)  )
        return redirect(url_for("student", student_no = student_no))
    else:
        return redirect("/")

@app.route("/add_grade_course/<course_id>", methods=["POST", "GET"])
def new_grade_course(course_id):
    conn = get_db()
    if request.method == "GET":
        return render_template("add_grade_course.html", grades=select_grades(conn), students=select_students(conn), course_id=course_id, student_no = select_students(conn))
    elif request.method == "POST":
        course_id = course_id
        student_no = request.form["stud"]
        grade = request.form["grade"]
        

        render_template("add_grade_course.html", grades=select_grades(conn), students=select_students(conn), courses=course_id, student_no = select_students(conn), addgrade = add_grade(conn, course_id, student_no, grade)  )
        return redirect(url_for("course", course_id = course_id))
    else:
        return redirect("/")
if __name__ == "__main__":
    app.run(debug=True)