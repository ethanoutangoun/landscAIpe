const About = () => {
  return (
    <div className="about-container">
      <h1>About</h1>

      <p className="about-p">
        The purpose of this project is to label satellite image homes with the
        types of planting viability depending on the amount of sunlight the area
        gets per day. We plan to use machine learning methods like random forest
        network for image classification for labeling and utilize Mask RCNN to
        detect the outline of buildings. Lastly, we will calculate the shadow
        area of the buildings. We plan to utilize google satellite image and
        google map image repositories to train and test our model.
      </p>

      <h2>How It Works</h2>
    </div>
  );
};

export default About;
