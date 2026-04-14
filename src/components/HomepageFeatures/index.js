import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Plug and Play',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        No lengthy setup, no complex configuration. Itaca's robot arm is ready
        the moment it arrives — so your research starts the same day.
      </>
    ),
  },
  {
    title: '6+1 Degrees of Freedom',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Six axes of precise articulation, plus one extra degree of freedom for
        tasks that go beyond the ordinary. More reach, more flexibility, more
        possibilities for your research.
      </>
    ),
  },
  {
    title: 'Learn by Doing',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Hands-on from day one. Itaca is designed for experimentation — an arm
        that grows with your knowledge, turning every trial into a step forward
        on your odyssey.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
