import { FC } from 'react';
import type { BreadcrumbProps } from './Breadcrumb';
import type { BreadcrumbItemProps } from './BreadcrumbItem';
import { Breadcrumb as OriginBreadcrumb } from './Breadcrumb'
import { BreadcrumbItem } from './BreadcrumbItem'

type BreadcrumbProp = FC<BreadcrumbProps> & { Item: FC<BreadcrumbItemProps> };

const Breadcrumb: BreadcrumbProp = OriginBreadcrumb as BreadcrumbProp;

Breadcrumb.Item = BreadcrumbItem;

export default Breadcrumb;

