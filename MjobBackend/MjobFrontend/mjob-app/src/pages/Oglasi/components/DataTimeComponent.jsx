import React from 'react';
import styled from 'styled-components';

const DateTimeContainer = styled.div`
  /* Add your custom styling here */
`;

class DateTimeComponent extends React.Component {
   /* constructor(props) {
        super(props);
        this.state = {
            dateTimeFromDatabase: '2023-06-02T15:30:00Z', // Example database value
        };
    }

    */

    render() {
        const { dateTimeFromDatabase } = this.props;
        const databaseDate = new Date(dateTimeFromDatabase);
        const formattedDateTime = new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          //  hour: 'numeric',
          //  minute: 'numeric',
          //  second: 'numeric',
          //  hour12: true,
        }).format(databaseDate);

        return (
            <DateTimeContainer>
                { formattedDateTime}
            </DateTimeContainer>
        );
    }
}

export default DateTimeComponent;