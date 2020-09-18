import React from 'react';

export const Course = ({ courses }) => (
  <div>
    {courses.map((course, i) => (
      <div key={`${course.name} ${i}`}>
        <Header course={course} />
        <Content course={course} />
        <Total course={course} />
      </div>
    ))}
  </div>
);

const Header = ({ course }) => {
  return <h1>{course.name}</h1>;
};

const Total = ({ course }) => {
  const sum = course.parts.reduce((acc, part) => acc + part.exercises, 0);
  return (
    <p>
      <b>Number of exercises {sum}</b>
    </p>
  );
};

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  );
};

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map((part, i) => (
        <Part key={`${part.name} ${i}`} part={part} />
      ))}
    </div>
  );
};
