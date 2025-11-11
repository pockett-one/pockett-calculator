import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  name: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav 
      className="flex items-center gap-2 text-sm text-gray-600 mb-6"
      aria-label="Breadcrumb"
      itemScope
      itemType="https://schema.org/BreadcrumbList"
    >
      <Link 
        href="/" 
        className="flex items-center gap-1 hover:text-blue-600 transition-colors"
        itemProp="itemListElement"
        itemScope
        itemType="https://schema.org/ListItem"
      >
        <meta itemProp="position" content="1" />
        <Home className="w-4 h-4" />
        <span itemProp="name">Home</span>
        <link itemProp="item" href="https://pockettcalculator.com" />
      </Link>
      
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="w-4 h-4 text-gray-400" aria-hidden="true" />
          {item.href ? (
            <Link
              href={item.href}
              className="hover:text-blue-600 transition-colors"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              <meta itemProp="position" content={String(index + 2)} />
              <span itemProp="name">{item.name}</span>
              <link itemProp="item" href={`https://pockettcalculator.com${item.href}`} />
            </Link>
          ) : (
            <span 
              className="font-medium text-gray-900"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
              aria-current="page"
            >
              <meta itemProp="position" content={String(index + 2)} />
              <span itemProp="name">{item.name}</span>
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}

