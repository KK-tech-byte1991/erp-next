import React from 'react'
import ConfigurationForm from '@/app/components/common/ConfigurationForm/ConfigurationForm'
const CampusConfigEdit = (props: any) => {

    return (
        <ConfigurationForm
            handleConfigurationChanges={props.handleConfigurationChanges}
            data={props.params}
            mode="campus"
            isNew={props.isNew} />
    )
}

export default CampusConfigEdit