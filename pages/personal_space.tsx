import React, { useState, useEffect, useLayoutEffect } from 'react';
import type { NextPage } from 'next'
import Header from "@components/personal_space/Header";
const PersonalSpace: NextPage = () => {
  return (
    <div className="">
      <Header firstName="Yvens" lastName="Belaston"/>
    </div>
  );
}

export default PersonalSpace;