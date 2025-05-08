import styled from 'styled-components';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { Skill } from '../types';
import Card from './ui/Card';
import { useTheme } from '../context/ThemeContext';

// Register ChartJS components
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface SkillsRadarChartProps {
  skills: Skill[];
}

const Container = styled(Card)`
  padding: 2rem;
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 1.5rem 0;
  color: var(--color-text);
  text-align: center;
`;

const ChartContainer = styled.div`
  height: 350px;
  position: relative;

  @media (max-width: 640px) {
    height: 300px;
  }
`;

const SkillsRadarChart = ({ skills }: SkillsRadarChartProps) => {
  const { theme } = useTheme();
  
  // Generate chart data from skills
  const data = {
    labels: skills.map(skill => skill.name),
    datasets: [
      {
        label: 'Skill Level',
        data: skills.map(skill => skill.level),
        backgroundColor: skills.map(skill => `${skill.color}33`), // Add transparency to colors
        borderColor: skills.map(skill => skill.color),
        borderWidth: 2,
        pointBackgroundColor: skills.map(skill => skill.color),
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: skills.map(skill => skill.color),
        pointLabelFontSize: 14,
      }
    ]
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: {
          color: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
        grid: {
          color: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
        pointLabels: {
          color: theme === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
          font: {
            size: 12,
          },
        },
        ticks: {
          color: theme === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
          backdropColor: 'transparent',
          stepSize: 20,
          max: 100,
          min: 0,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            return `${context.label}: ${context.raw}%`;
          }
        }
      }
    },
  };

  return (
    <Container>
      <Title>Technical Skills</Title>
      <ChartContainer>
        <Radar data={data} options={options} />
      </ChartContainer>
    </Container>
  );
};

export default SkillsRadarChart;