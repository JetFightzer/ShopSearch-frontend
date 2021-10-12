
import './tailwind.css';
import tw from './tailwind.css';

export default function tailwind(...classes: (keyof typeof tw)[]) { return classes.join(' '); }