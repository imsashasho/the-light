// import LocomotiveScroll from 'locomotive-scroll';
import i18next from 'i18next';
import { gsap, ScrollTrigger } from 'gsap/all';
import axios from 'axios';
import * as yup from 'yup';
import $ from 'jquery';
import { _horizontal } from 'gsap/Observer';
import FormMonster from '../../pug/components/form/form';
import SexyInput from '../../pug/components/input/input';

/** ******************************* */
import layoutData from '../../static/data-for-layout-pop-up.json';

/*
 * smooth scroll start
 */
global.gsap = gsap;
global.axios = axios;

