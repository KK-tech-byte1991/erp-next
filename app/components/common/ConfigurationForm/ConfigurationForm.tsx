"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { CloudIcon, CircleIcon, CircleIcon2 } from "../../../assets/Images"
import EditorText from '@/app/components/common/EditorComponent/Editor'
import Link from 'next/link'
import StepComponent from '../StepComponent/StepComponent'
import { format } from 'date-fns'

type ConfigurationProps = {
  mode: string,
  data?: any,
  handleConfigurationChanges: Function,
  isNew?: boolean
}
function ConfigurationForm(props: ConfigurationProps) {


  const configurationData = props.mode === "trust" ? props.data?.trustConfiguration : props.data?.campusConfiguration
  const trustConfId = configurationData ? configurationData.trustConfId : null
  const campusConfId = configurationData ? configurationData.campusConfId : null
  const [missionVision, setMissionVision] = useState<string>(configurationData ? configurationData.missionVision : "")
  const [qualityPolicy, setQualityPolicy] = useState<string>(configurationData ? configurationData.qualityPolicy : "")
  const [longTermGoal, setLongTermGoal] = useState<string>(configurationData ? configurationData.longTermGoal : "")
  const [shortTermGoal, setShortTermGoal] = useState<string>(configurationData ? configurationData.shortTermGoal : "")
  const [governorsComposition, setGovernorsComposition] = useState<string>(configurationData ? configurationData.governorsComposition : "")
  const [upload] = useState<string | null>(null)
  const labels: string[] = ["Mission & Vision", "Quality Policy", "Long Term Goal", "Short Term Goal", "The Board of Governors and its Composition", "Upload"]
  const [currentOption, setCurrentOption] = useState<number>(0)

  useEffect(() => {
    setMissionVision(configurationData ? configurationData.missionVision : "")
    setQualityPolicy(configurationData ? configurationData.qualityPolicy : "")
    setLongTermGoal(configurationData ? configurationData.longTermGoal : "")
    setShortTermGoal(configurationData ? configurationData.shortTermGoal : "")
    setGovernorsComposition(configurationData ? configurationData.governorsComposition : "")
  }, [configurationData])



  const handleNext = () => {
    setCurrentOption(currentOption + 1)
  }
  const handleNavChange = (index: number) => {
    if (currentOption !== index) {
      setCurrentOption(index)
    }

  }

  const handleReset = () => {
    setMissionVision(configurationData ? configurationData.missionVision : "");
    setQualityPolicy(configurationData ? configurationData.qualityPolicy : "");
    setShortTermGoal(configurationData ? configurationData.shortTermGoal : "");
    setLongTermGoal(configurationData ? configurationData.longTermGoal : "")
    setGovernorsComposition(configurationData ? configurationData.governorsComposition : "")
  }
  const requiredConfiguration = () => {
    let configData = {
      missionVision,
      qualityPolicy,
      longTermGoal, shortTermGoal, governorsComposition, "modifiedTime": format(new Date(), 'yyyy-MM-dd HH:mm:ss')
    }

    let trustConfiguration = trustConfId ? { trustConfId, ...configData } : configData
    let campusConfiguration = campusConfId ? { campusConfId, ...configData } : configData

    switch (props.mode) {
      case "trust": return { ...props.data, trustConfiguration }
        break;
      case "campus": return { ...props.data, campusConfiguration }
        break;
    }
    return {}
  }




  return (<>
    {props.isNew && <StepComponent data={["General Details", "Configuration", "Success"]}
      active={1} />}
    <p className="looklikebtn  w-44 min-w-full md:min-w-0 ">Configuration Details</p>
    <div className="grid grid-cols-3 gap-4">
      {labels.map((configLabel, index) => (<div key={configLabel} className="col-md-4">
        <button type="button" className={index <= currentOption ? "configActive w-full configBtns " : " w-full configBtns"} onClick={() => handleNavChange(index)}> {configLabel}
          <Image src={index <= currentOption ? CircleIcon2 : CircleIcon}
            alt="circleicon" /> </button>
      </div>)
      )}
    </div>

    {currentOption >= 5 && <div className="Uploadbtnspace">
      <button type="button" className="uploadbtn"> <Image src={CloudIcon} className="" alt="circleicon" /> Upload </button>
    </div>}
    {currentOption === 0 && <EditorText
      handleEditorValue={(e: string) => setMissionVision(e)}
      placeholder={'Write something...'}
      text={missionVision}
      handleNext={handleNext}
    />}
    {currentOption === 1 && <EditorText
      handleEditorValue={(e: string) => setQualityPolicy(e)}
      placeholder={'Write something...'}
      text={qualityPolicy}
      handleNext={handleNext}
    />}
    {currentOption === 2 && <EditorText
      handleEditorValue={(e: string) => setLongTermGoal(e)}
      placeholder={'Write something...'}
      text={longTermGoal}
      handleNext={handleNext}
    />}
    {currentOption === 3 && <EditorText
      handleEditorValue={(e: string) => setShortTermGoal(e)}
      placeholder={'Write something...'}
      text={shortTermGoal}
      handleNext={handleNext}
    />}
    {currentOption === 4 && <EditorText
      handleEditorValue={(e: string) => setGovernorsComposition(e)}
      placeholder={'Write something...'}
      text={governorsComposition}
      handleNext={handleNext}
    />}
    <div className="clearfix"></div>
    <div className="col-md-12 commandbtn d-flex">
      <button className="btnstyle" onClick={() => props.handleConfigurationChanges(requiredConfiguration())}>Save</button>
      <button className="btnstyle btnstylebg1" type="submit" onClick={handleReset}>Reset</button>
      <Link href={props.mode === "trust" ? "/trust" : "/campus"}  > <button className="btnstyle btnstylebg2" type="submit" >Cancel</button></Link>
    </div>
  </>
  )
}

export default ConfigurationForm