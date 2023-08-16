import moment from 'moment'
import { createSelector } from 'reselect'
import { conversion } from './model'

export const getIsFetchingConversionTool = (state, props) => state.conversiontool.params.isFetching
export const getIsConversionToolFetched = (state, props) => state.conversiontool.params.conversionToolFetched
export const getConversionToolList = (state, props) => state.conversiontool.byId


export const getConversion = (state, props) => {
    return conversion()
}

export const getFilteredConversionTool = createSelector(
    getConversionToolList,
    conversion => {
        const keys = Object.keys(conversion)
        const obj = keys.map((key) => {
            return { key: key, value: key, text: conversion[key].releasename, filename: conversion[key].releasename , releasedate:conversion[key].releasedate }

        })
        const sorted = obj.sort((a, b) => { return moment(b.releasedate) - moment(a.releasedate) })
        return sorted
    }
)