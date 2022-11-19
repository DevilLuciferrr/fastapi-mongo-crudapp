# Schema helps to serialize and also convert mongodb format json to our UI needed json

def studentEntity(item)-> dict:
    return {
        "id": str(item["_id"]),
        "name": item["student_name"],
        "email": item["student_email"],
        "phone": item["student_ph"]
    }

def listOfStudentEntity(item_list)->list:
    list_stud_entity = []
    for item in item_list:
        list_stud_entity.append(studentEntity(item))
    return list_stud_entity