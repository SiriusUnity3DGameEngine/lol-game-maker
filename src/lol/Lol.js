// model
import { Model } from './model/Model';
import { vertShader, fragShader } from './model/Shader';
import { Texture } from './model/Texture';
import { Vertex } from './model/Vertex';
import { Bone } from './model/Bone';
import { Animation } from './model/Animation';
import { AnimationBone } from './model/AnimationBone';
import { BaseAnimations } from './model/BaseAnimations';
import { HiddenBones } from './model/HiddenBones';
import { champions, animNames } from './constant';

// ui
import { AddHeroWin } from './ui/AddHeroWin';

var Lol = {
    champions: champions,
    animNames: animNames,
    Model: Model,
    vertShader: vertShader,
    fragShader: fragShader,
    Texture: Texture,
    Vertex: Vertex,
    Bone: Bone,
    Animation: Animation,
    AnimationBone: AnimationBone,
    BaseAnimations: BaseAnimations,
    HiddenBones: HiddenBones,
    AddHeroWin: AddHeroWin
};

export { Lol };