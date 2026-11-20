import {useState} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import styles from './index.module.css';

const INSTALL = 'curl -fsSL https://itacarobotics.com/install.sh | bash';

const STATS = [
  {value: '6+1', label: 'Degrees of freedom'},
  {value: '1.0 kg', label: 'Payload'},
  {value: '28 Nm', label: 'Peak joint torque'},
  {value: '0.1 mm', label: 'Repeatability'},
];

const FEATURES = [
  {
    title: 'Backdrivable by design',
    text: 'Quasi-direct-drive motors on every joint. Push the arm by hand, feel the controller, and learn how real robots react to contact.',
  },
  {
    title: 'Impedance control',
    text: 'Command position, velocity, feedforward torque and per-joint stiffness and damping in a single call, at the bus rate.',
  },
  {
    title: 'Gravity compensation',
    text: 'Computed from the URDF with Pinocchio. Switch it on and the arm floats, ready for teaching and free-drive experiments.',
  },
  {
    title: 'Python & C++',
    text: 'The same API in both languages: ulixpy for fast prototyping, ulixarm_cpp for realtime loops without allocations.',
  },
  {
    title: 'Parallel gripper',
    text: '90 mm stroke, controlled by width, ratio or grip strength, plus an Intel RealSense D405 depth camera in the box.',
  },
  {
    title: 'Open model',
    text: 'Full URDF with visual and collision meshes and dynamic parameters. Use it in any simulator or planner.',
  },
];

const PY = `import numpy as np
from ulixpy import UlixArm

robot = UlixArm(gripper=True)
robot.connect("/dev/ttyACM0")
robot.enable()
robot.refresh()

zero = np.zeros(6)
try:
    while True:
        # kp = kd = 0: the arm floats, move it by hand
        robot.control(zero, zero, zero, zero, zero, True)
finally:
    robot.hold()
    robot.disconnect()`;

const CPP = `#include <ulixarm_cpp/ulixarm.hpp>

int main()
{
    ulixarm::UlixArm robot(/*gripper=*/true);
    robot.connect("/dev/ttyACM0");
    robot.enable();

    const auto zero = ulixarm::Joints::Zero();
    // kp = kd = 0: the arm floats, move it by hand
    while (true)
        robot.control(zero, zero, zero, zero, zero, /*gravity=*/true);
}`;

function InstallCommand() {
  const [copied, setCopied] = useState(false);
  const copy = () =>
    navigator.clipboard.writeText(INSTALL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  return (
    <div className={styles.install}>
      <span className={styles.prompt}>$</span>
      <code>{INSTALL}</code>
      <button type="button" className={styles.copy} onClick={copy} aria-label={copied ? 'Copied' : 'Copy install command'} title="Copy">
        {copied ? (
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
            <path fill="currentColor" d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
            <path fill="currentColor" d="M16 1H4a2 2 0 0 0-2 2v14h2V3h12V1zm3 4H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm0 16H8V7h11v14z" />
          </svg>
        )}
      </button>
    </div>
  );
}

function Hero() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={styles.hero}>
      <div className={clsx('container', styles.heroInner)}>
        <div className={styles.heroText}>
          <span className={styles.eyebrow}>Itacarobotics · Research Kit</span>
          <Heading as="h1" className={styles.heroTitle}>
            Learn robotics on a <span className={styles.accent}>real arm</span>.
          </Heading>
          <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link className="button button--primary button--lg" to="/docs/getting-started">
              Get started
            </Link>
            <Link className="button button--outline button--secondary button--lg" to="/docs/intro">
              Explore the kit
            </Link>
          </div>
          <InstallCommand />
        </div>
      </div>
    </header>
  );
}

function Stats() {
  return (
    <section className={styles.stats}>
      <div className={clsx('container', styles.statsGrid)}>
        {STATS.map((s) => (
          <div key={s.label} className={styles.stat}>
            <div className={styles.statValue}>{s.value}</div>
            <div className={styles.statLabel}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Features() {
  return (
    <section className={styles.section}>
      <div className="container">
        <Heading as="h2" className={styles.sectionTitle}>
          Built for research
        </Heading>
        <div className={styles.featureGrid}>
          {FEATURES.map((f, i) => (
            <div key={f.title} className={styles.card}>
              <span className={styles.cardIndex}>{String(i + 1).padStart(2, '0')}</span>
              <Heading as="h3">{f.title}</Heading>
              <p>{f.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CodeShowcase() {
  return (
    <section className={clsx(styles.section, styles.sectionAlt)}>
      <div className={clsx('container', styles.split)}>
        <div>
          <Heading as="h2" className={styles.sectionTitle}>
            From box to motion in minutes
          </Heading>
          <ol className={styles.steps}>
            <li>
              <strong>Clamp and wire.</strong> Mount the arm on a table and connect the Power Box to your PC over USB-C.
            </li>
            <li>
              <strong>Install with one command.</strong> The installer builds the API and sets up a ready-to-use Python environment.
            </li>
            <li>
              <strong>Run your first program.</strong> Enable gravity compensation and guide the arm by hand.
            </li>
          </ol>
          <Link className="button button--primary" to="/docs/getting-started">
            Follow the guide →
          </Link>
        </div>
        <div className={styles.codeCard}>
          <Tabs groupId="lang">
            <TabItem value="py" label="Python" default>
              <CodeBlock language="python">{PY}</CodeBlock>
            </TabItem>
            <TabItem value="cpp" label="C++">
              <CodeBlock language="cpp">{CPP}</CodeBlock>
            </TabItem>
          </Tabs>
        </div>
      </div>
    </section>
  );
}

function CallToAction() {
  return (
    <section className={styles.cta}>
      <div className="container">
        <Heading as="h2">Ready to start?</Heading>
        <p>Dive into the documentation for the Python and C++ APIs.</p>
        <div className={styles.buttons}>
          <Link className="button button--primary button--lg" to="/docs/api/ulixpy">
            Python API
          </Link>
          <Link className="button button--outline button--secondary button--lg" to="/docs/api/ulixarm_cpp">
            C++ API
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <Hero />
      <main>
        <Stats />
        <Features />
        <CodeShowcase />
        <CallToAction />
      </main>
    </Layout>
  );
}
