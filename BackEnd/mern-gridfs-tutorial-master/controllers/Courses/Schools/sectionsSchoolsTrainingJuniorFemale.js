//Taking the router for express to use the GET, POST, HTTP methods.

const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

//Importing the employee schema

var { Student } = require('../../../models/student')
var { SectionsSchoolsTrainingJuniorFemale } = require('../../../models/Courses/Schools/SectionsSchoolsTrainingJuniorFemale')


 //Now to use router.ger to use properties of the schema like find collection, get collection, etc

 //To use this get requeest we need to type https://didactics.one/employees/, this is coming from index.js 
 //Where its mentioned /employees is the router

 
router.get('/female-schools-junior-create-sections', (req, res) => {
    Student.find({ "gender" : "Female", "courses" : "School Junior" },(err, doc) => {
        if (!err) {
            var count = 0
            console.log(doc[0]._id)
            var sectionArray = []
            doc.forEach(element => {
              sectionArray.push({
                  id: doc[count]._id,
                  name: doc[count].name
              })
              count=count+1
             });
             var countForSection = 0
             console.log(sectionArray)
             
             sectionArray.forEach(element => {
                var student = "student" + countForSection
                var emp = new SectionsSchoolsTrainingJuniorFemale({
                    student1:sectionArray[countForSection++],
                    student2:sectionArray[countForSection++],
                    student3:sectionArray[countForSection++],
                    student4:sectionArray[countForSection++],
                    student5:sectionArray[countForSection++],
            
                 });
                 //Calling save function from mongoose, it will call back a function which will return a mongoDB object with above fields and properties
                 //There will be another property called _id which will be used to fetch a particular data by mongoDB
            
            
                 emp.save((err, doc) => {
                     //Checking for error
                     //if (!err) { res.send(doc);}
                     //else {console.log('Error in Student Save :' + JSON.stringify(err, undefined, 2)); }
                 });
                
             });
             
             //res.send(doc);
             }
        else { console.log('Error in Retrieving Blog :' + JSON.stringify(err, undifines, 2)); }
    });
    

});

router.get('/male-schools-junior-deletefields', (req, res) => {
    SectionsSchoolsTrainingJuniorFemale.deleteMany({ "student1": null },(err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retrieving Blog :' + JSON.stringify(err, undifines, 2)); }
    });

});
router.get('/male-schools-junior', (req, res) => {
    SectionsSchoolsTrainingJuniorFemale.find((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retrieving Blog :' + JSON.stringify(err, undifines, 2)); }
    });

});
module.exports = router;


 //We have to configure these routes in the root file which is index.js


