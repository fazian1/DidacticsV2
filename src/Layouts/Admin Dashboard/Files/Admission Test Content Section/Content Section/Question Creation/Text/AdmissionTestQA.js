import React, { useState, useEffect, useRef } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { Formik, FormikConsumer, useFormik } from 'formik'
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import { useRouteMatch, useHistory, useLocation } from "react-router-dom";
import { createAdmissionTestQuestions } from '../../../../Apis/apiForAdmissionTestQuestions';


function AdmissionTestQAForAdmin() {
    const location = useLocation();
    const editorRef = useRef(null);
    const history = useHistory()
    const log = (data) => {
        if (editorRef.current) {
          console.log(data)
          var contentFromTextArea = editorRef.current.getContent();
          location.state.questioncontent = contentFromTextArea
          location.state.questiontitle = data.questiontitle
          location.state.totalmarks = data.totalmarks
          console.log(location.state)
          createAdmissionTestQuestions(location.state)
          history.push("/admission-test-list")
        }
    };
    const onSubmit = async (data) => {
        
        await log(data)
        //history.push("/admission-question-details")
      }
      const formik = useFormik({
        initialValues: {
           totalmarks:'',
           questiontitle: '',
        },

        //4 Make onSubmit propert to handle what happens to data on form submisison

        onSubmit: values => {

          
          //createTodo(formik.values)
          //redirecting 
          //history.push("/")

          onSubmit(formik.values)

        },

        //5 Make validation property
        
        validate: values => {
            
            let errors = {}

            const letters = /^[A-Za-z ]+$/;

            const cnic = /^[0-9--]+$/;

            const phone = /^[0-9]+$/;

            const symbols = /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/;
            if(!values.totalmarks){
                errors.totalmarks = "Please enter Total Marks"
            }else if (!phone.test(values.totalmarks)) {
                errors.totalmarks = "Please enter digits only"
            }else if (symbols.test(values.totalmarks)) {
                errors.totalmarks = "Please enter digits only"
            }else if (values.totalmarks > 100) {
              errors.totalmarks = "Marks for the question cannot exceed 100"
          }
            return errors


        }


    })
    return (
        <>
        <div className="container-fluid">
        <Row>
          <Col md="12">
            <Card className="card-plain">
              <CardHeader>Admission Test Q/A Content Creation Panel</CardHeader>
              <CardBody>
              <form onSubmit={formik.handleSubmit}>
                    <div className = "mt-4"> 
                        <div class="p-3 mb-2 bg-dark text-white">
                            <label ><h3>Question's Title</h3></label>
                        </div>
                        <div class="p-3 mb-2 bg-light text-dark">
                        <input type="text" placeholder="Title for Question" name="questiontitle" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.questiontitle} className="form-control" required  />
                        {formik.errors.questiontitle && formik.touched.questiontitle ? (<div className='error'>{formik.errors.questiontitle}</div>) : null}
                        </div>
                        <hr />
                    </div>
                    <div className = "mt-4"> 
                        <div class="p-3 mb-2 bg-dark text-white">
                            <label ><h3>Please create your desired <b>Q/A</b> Question below</h3></label>
                        </div>
                        <div class="p-3 mb-2 bg-light text-dark">
                          <Editor
                            apiKey='zbxzyzqkm6uw6oz4uywxx4kbvw59xasjkldmya07y0hfjupf'
                            onInit={(evt, editor) => editorRef.current = editor}
                            initialValue=""
                            init={{
                            height: 500,
                            browser_spellcheck : true,
                            menubar: false,
                            plugins: [
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table paste code help wordcount'
                            ],
                            toolbar: 'undo redo | formatselect | ' +
                            'bold italic backcolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'removeformat | help',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                            }}
                          />  
                        </div>
                        <hr />
                    </div>
                    <div className = "mt-4"> 
                          <div class="p-3 mb-2 bg-dark text-white">
                              <label ><h3>Total Marks</h3></label>
                          </div>
                          <div class="p-3 mb-2 bg-light text-dark">
                                {/*2 put onChange = {formkit.handleChange} value={formik.values.name} in all the form fields with their corroposind name  in values */}
                                <input type="text" placeholder="Total Marks for the Question" name="totalmarks" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.totalmarks} className="form-control" required  />
                                {formik.errors.totalmarks && formik.touched.totalmarks ? (<div className='error'>{formik.errors.totalmarks}</div>) : null}
                          </div>
                          <hr />
                      </div>
                        <center>
                          <button type="submit" className="btn btn-dark mt-3">
                            Create Question
                          </button>
                        </center>
                    </form>
                    </CardBody>
                    </Card>
                    </Col>
                    </Row>
                    </div>
    </>
    )
}

export default AdmissionTestQAForAdmin
