import React, { useState, useEffect, useRef } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { Formik, FormikConsumer, useFormik } from 'formik'
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import { useRouteMatch, useHistory, useLocation } from "react-router-dom";
import { createAnswers } from '../../../../../Apis/apiForAnswers';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import "./testStyle.css";

function MCQForTestsForStudent() {
  const location = useLocation();
  const editorRef = useRef(null);
  const history = useHistory()
    useEffect(() => {
        const fetchItems = async function() {
            var contents = location.state
            console.log(location.state.optionsQuestionMcq[0].options)
        }
        fetchItems() 
    }, [])
           /*const { register, handleSubmit } = useForm({
    defaultValues: { text: todo ? todo.text : "" },
  });*/

  /*const submitHandler = handleSubmit((data) => {
    onSubmit(data)
  });*/
  const log = (data) => {
      if (editorRef.current) {
        data.answerContent = editorRef.current.getContent();
        console.log(data)
        //createAnswers(data)
        //history.push("/answer-list")
      }
  };

  /*useEffect(() => {
    const fetchTodo = async () => {
      const blogstitle = await getPlacementTestblogstitle(`${props.match.params._id}`)
      setblogstitle(blogstitle)
    }
    fetchTodo()
  }, []);
  */
  const onSubmit = async (data) => {
      data.answerContent = data.optionsQuestionMcq
      data.optionsQuestionMcq = location.state.optionsQuestionMcq
      console.log(data)
      createAnswers(data)
      history.push("/answer-list")
  }

  const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
      return <div className="timer">Too lale...</div>;
    }
  
    return (
      <div className="timer">
        <div className="text">Remaining</div>
        <div className="value">{remainingTime}</div>
        <div className="text">seconds</div>
      </div>
    );
  };
  
  const handleCompletion = (e) => {
    if(location.state.grade == 'Grade 1'){
      history.push({
        pathname:"/Grade-1-content-test"
      })
    }
  
  }

    //1 Start of by making initial values 
    const formik = useFormik({
        initialValues: {
           name:'',
           grade: location.state.grade,
           answertype: location.state.answertype,
           questionContent: location.state.questioncontent,
           questionTitle: location.state.questiontitle,
           totalMarks: location.state.totalmarks,
           optionsQuestionMcq: location.state.optionsQuestionMcq,
           answerContent:'',
           marksObtained: '',
           teacherRemarks: '',
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
            
            return errors


        }


    })

    console.log("Form errors", formik.errors)
    return (
      
        <>
      <div className="content">
      <div className="timer-wrapper">
      <Row>
          <Col md="12" >
          <Card className="card-plain" style={{textAlign:"center"}} >
                <CardHeader >Timer</CardHeader>
                <CardBody>
                  Please answers questions in the given time.
            
                <CountdownCircleTimer
                  isPlaying
                  duration={20}
                  colors={[
                    ['#004777', 0.33],
                    ['#F7B801', 0.33],
                    ['#A30000', 0.33],
                  ]}
                  onComplete={(e) => handleCompletion(e)}
                >
                   {renderTime}
                {/*{({ remainingTime }) => remainingTime}*/}
                </CountdownCircleTimer>
         
                </CardBody>
                </Card>
       
          </Col>
        </Row>
        </div>
        <Row>
          <Col md="12">
          <Card className="card-plain">
                <CardHeader>{location.state.questiontitle}</CardHeader>
                <CardBody>
                    {location.state.questioncontent}
                </CardBody>
                </Card>
            <Card className="card-plain">
              <CardHeader>Answer</CardHeader>
              <CardBody>
                    <div className="mt-3">
                    <form onSubmit={formik.handleSubmit}>
                    <div>
                    <div class="p-3 mb-2 bg-light text-dark">
                              {/*2 put onChange = {formkit.handleChange} value={formik.values.name} in all the form fields with their corroposind name  in values */}
                              <input type="radio" name="optionsQuestionMcq" id="option1" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.optionsQuestionMcq[0].options} className="form-control"   />
                              <label for = "option1">{location.state.optionsQuestionMcq[0].options}</label>
                              <input type="radio" name="optionsQuestionMcq" id="option2" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.optionsQuestionMcq[1].options} className="form-control"   />
                              <label for = "option2">{location.state.optionsQuestionMcq[1].options}</label>
                              <input type="radio" name="optionsQuestionMcq" id="option3" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.optionsQuestionMcq[2].options} className="form-control"   />
                              <label for = "option3">{location.state.optionsQuestionMcq[2].options}</label>
                              <input type="radio" name="optionsQuestionMcq" id="option4" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.optionsQuestionMcq[3].options} className="form-control"  />
                              <label for = "option4">{location.state.optionsQuestionMcq[3].options}</label>
                              {formik.errors.totalmarks && formik.touched.totalmarks ? (<div className='error'>{formik.errors.totalmarks}</div>) : null}
                        </div>
                    </div>
                    <center>
                      <button type="submit" className="btn btn-dark mt-2">
                        Submit Answer
                      </button>
                    </center>
                    </form>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
    )


}

export default MCQForTestsForStudent
