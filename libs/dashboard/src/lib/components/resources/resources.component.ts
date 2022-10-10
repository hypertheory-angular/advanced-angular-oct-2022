import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ht-dashboard-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css'],
})
export class ResourcesComponent {
  items: LinkItem[] = [
    {
      title: 'NX - Monorepos for Angular',
      content: 'The tool that wraps <em>Angular CLI</em>',
      link: 'https://nx.dev',
      linkText: 'Learn about NX',
    },
    {
      title: 'Daisy UI',
      content: 'The UI Library',
      link: 'https://daisyui.com',
      linkText: 'The Open Source DaisyUI Site',
    },
    {
      title: 'Tailwind',
      content: 'Tailwind CSS',
      link: 'https://tailwindcss.com',
      linkText: 'Tailwind Site',
    },
    {
      title: 'TypeScript',
      content: 'The TypeScript Site',
      link: 'https://typscriptlang.org',
      linkText: 'Typescript Site',
    },
  ];
}

type LinkItem = {
  title: string;
  content: string;
  link: string;
  linkText: string;
};
