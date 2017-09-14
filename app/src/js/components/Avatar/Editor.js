import React from 'react'
import { connect } from 'react-redux'

import Card from 'elements/Card'
import Select from 'elements/Select'

import {
  updateBrows,
  updateChest,
  updateEars,
  updateEyes,
  updateFeet,
  updateHead,
  updateLashes,
  updateMouth,
  updateWings,
} from 'actions/avatar'

const brows = [
  { value: 'angry', text: 'Angry', image: '/images/avatar/brows/AngryBrows.png', },
  { value: 'sad', text: 'Sad', image: '/images/avatar/brows/SadBrows.png', },
]
const chest = [
  { value: 'abs', text: 'Abs', image: '/images/avatar/chest/AbsChest.png', },
  { value: 'small', text: 'Small', image: '/images/avatar/chest/SmallChest.png', },
  { value: 'medium', text: 'Medium', image: '/images/avatar/chest/MediumChest.png', },
  { value: 'large', text: 'Large', image: '/images/avatar/chest/LargeChest.png', },
]
const ears = [
  { value: 'dragon', text: 'Dragon', image: '/images/avatar/ears/DragonEars.png', },
]
const eyes = [
  { value: 'angry', text: 'Angry', image: '/images/avatar/eyes/AngryEyes.png', },
  { value: 'sad', text: 'Sad', image: '/images/avatar/eyes/SadEyes.png', },
  { value: 'wink', text: 'Wink', image: '/images/avatar/eyes/WinkEyes.png', },
]
const feet = [
  { value: 'cloven', text: 'Cloven', image: '/images/avatar/feet/ClovenFeet.png', },
  { value: 'hoof', text: 'Hoof', image: '/images/avatar/feet/HoofFeet.png', },
  { value: 'paw', text: 'Paw', image: '/images/avatar/feet/PawFeet.png', },
]
const head = [
  { value: 'halo', text: 'Halo', image: '/images/avatar/head/Halo.png', },
]
const lashes = [
  { value: 'angry', text: 'Angry', image: '/images/avatar/lashes/AngryEyesLashes.png', },
  { value: 'open', text: 'Open', image: '/images/avatar/lashes/OpenEyesLashes.png', },
  { value: 'wink', text: 'Wink', image: '/images/avatar/lashes/WinkEyesLashes.png', },
]
const mouth = [
  { value: 'deer', text: 'Deer', image: '/images/avatar/mouth/DeerMuzzle.png', },
  { value: 'dogCat', text: 'DogCat', image: '/images/avatar/mouth/DogCatMuzzle.png', },
  { value: 'dragonHorse', text: 'DragonHorse', image: '/images/avatar/mouth/DragonHorseMuzzle.png', },
  { value: 'rabbit', text: 'Rabbit', image: '/images/avatar/mouth/RabbitMuzzle.png', },
]
const wings = [
  { value: 'deer', text: 'Deer', image: '/images/avatar/wings/AngelWings.png', },
  { value: 'dogCat', text: 'DogCat', image: '/images/avatar/wings/DemonWings.png', },
  { value: 'dragonHorse', text: 'DragonHorse', image: '/images/avatar/wings/DragonWings.png', },
]

const ElementPicker = ({ name, elements, active, onSelect }) =>
  <Card className='avatar-editor__element'>
    <Select>
      { elements.map(({ value, image, text }) =>
        <Select.Option key={`avatar-${value}`} className='element-option' selected={value === active} onClick={() => onSelect(value)}>
          <Select.Image src={image} alt={text} />
          {text}
        </Select.Option>
      ) }
    </Select>
  </Card>

const AvatarEditor = ({
  avatar,
  updateBrows,
  updateChest,
  updateEars,
  updateEyes,
  updateFeet,
  updateHead,
  updateLashes,
  updateMouth,
  updateWings,
}) =>
  <Card className='avatar-editor'>
    <Card.Header>
      <Card.Title>Avatar Editor</Card.Title>
    </Card.Header>
    <Card.Content className='avatar-editor__elements'>
      <ElementPicker name='shoulder' elements={brows} active={avatar.brows} onSelect={updateBrows} />
      <ElementPicker name='shoulder' elements={chest} active={avatar.chest} onSelect={updateChest} />
      <ElementPicker name='shoulder' elements={ears} active={avatar.ears} onSelect={updateEars} />
      <ElementPicker name='shoulder' elements={eyes} active={avatar.eyes} onSelect={updateEyes} />
      <ElementPicker name='shoulder' elements={feet} active={avatar.feet} onSelect={updateFeet} />
      <ElementPicker name='shoulder' elements={head} active={avatar.head} onSelect={updateHead} />
      <ElementPicker name='shoulder' elements={lashes} active={avatar.lashes} onSelect={updateLashes} />
      <ElementPicker name='shoulder' elements={mouth} active={avatar.mouth} onSelect={updateMouth} />
      <ElementPicker name='shoulder' elements={wings} active={avatar.wings} onSelect={updateWings} />
    </Card.Content>
  </Card>

const mapStateToProps = ({ user }) =>
({
  avatar: user.avatar
})

const mapDispatchToProps = dispatch =>
({
  updateBrows: brows => dispatch(updateBrows(brows)),
  updateChest: chest => dispatch(updateChest(chest)),
  updateEars: ears => dispatch(updateEars(ears)),
  updateEyes: eyes => dispatch(updateEyes(eyes)),
  updateFeet: feet => dispatch(updateFeet(feet)),
  updateHead: head => dispatch(updateHead(head)),
  updateLashes: lashes => dispatch(updateLashes(lashes)),
  updateMouth: torso => dispatch(updateMouth(torso)),
  updateWings: pelvis => dispatch(updateWings(pelvis)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AvatarEditor)
