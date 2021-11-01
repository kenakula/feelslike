import * as React from 'react';

interface Props {
  code?: number;
  header: string;
  message: string;
}

const TechnicalIssues = ({ code, header, message }: Props): JSX.Element => (
  <div className="technical-issues p-5">
    <div className="technical-issues__group">
      <div className="mr-4">
        {!!code && <h1 className="display-3">{code}</h1>}
      </div>
      <div>
        <h4 className="pt-3">{header}</h4>
        <p className="text-muted">{message}</p>
      </div>
    </div>
  </div>
);

TechnicalIssues.defaultProps = {
  header: 'Произошла ошибка',
  message: 'Перезагрузите страницу',
};

export default TechnicalIssues;
