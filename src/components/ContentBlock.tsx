import {
  Text,
  RichText,
  Field,
  withDatasourceCheck,
  useComponentProps,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type ContentBlockProps = ComponentProps & {
  fields: {
    heading: Field<string>;
    content: Field<string>;
  };
  componentServerData: string;
};

/**
 * A simple Content Block component, with a heading and rich text block.
 * This is the most basic building block of a content site, and the most basic
 * JSS component that's useful.
 */
const ContentBlock = ({ fields, componentServerData }: ContentBlockProps): JSX.Element => {
  const pageServerData = useComponentProps<string>('server-data');

  return (
    <div className="contentBlock">
      <h2>{pageServerData}</h2>
      <h2>{componentServerData}</h2>
      <Text tag="h2" className="contentTitle" field={fields.heading} />

      <RichText className="contentDescription" field={fields.content} />
    </div>
  );
};

import serverData from '../lib/server-data.json';

export const getStaticProps = async () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const props: any = {};
  props['componentServerData'] = 'component-level-static-props';

  // Use serverData to force import; delete to keep out of SSG'd HTML.
  props['imported-server-data'] = serverData;
  delete props['imported-server-data'];

  return props;
};

export default withDatasourceCheck()<ContentBlockProps>(ContentBlock);
