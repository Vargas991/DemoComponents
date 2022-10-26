import React, { useEffect, useState } from "react";
import DatePicker, {
  Calendar,
  DateObject,
  getAllDatesInRange,
} from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import { useForm, Controller } from "react-hook-form";

const WEEKLY = "Weekly";
const DAILY = "Daily";

export const Select = ({ label, options, value, handleChange }) => {
  return (
    <>
      <select onChange={handleChange} value={value} name={label} id="select">
        {options.map((day, idx) => (
          <option key={idx} value={day}>
            {day}
          </option>
        ))}
      </select>
    </>
  );
};

const initialValueDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const initialValueFrequency = ["Daily", "Weekly", "Personalized"];

export const Events = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      startDate: new DateObject(),
      endDate: new DateObject().add(4, "d"),
    },
  });

  const [value, setValue] = useState({
    startDate: new DateObject(),
    endDate: new DateObject().add(4, "d"),
  });

  const [day, setDay] = useState("Monday");
  const [frequency, setFrequency] = useState("Daily");

  const handleChangeDay = (e) => {
    setDay(e.target.value);
  };

  const handleChangeDate = (name, valueDate) => {
    console.log(value);
    setValue({
      ...value,
      [name]: valueDate,
    });
  };
  const handleChangeFrequency = (e) => {
    setFrequency(e.target.value);
  };

  return (
    <>
      <h3>Schedule multiple events</h3>
      <Select
        label="Frequency"
        value={frequency}
        options={initialValueFrequency}
        handleChange={handleChangeFrequency}
      />
      <div>
        {frequency === WEEKLY && (
          <Select
            label=""
            value={day}
            options={initialValueDays}
            handleChange={handleChangeDay}
          />
        )}
        <div>
          <Controller
            control={control}
            name="startDate"
            render={({
              field: { onChange, name, value },
              // fieldState: { invalid, isDirty }, //optional
              // formState: { errors }, //optional, but necessary if you want to show an error message
            }) => (
              <DatePicker
                minDate={new DateObject()}
                value={value.startDate}
                placeholder="Start Date"
                onChange={(startDate) => {
                  onChange(handleChangeDate(name, value));
                }}
                mapDays={({ date }) => {
                  let enableDay = date.weekDay.name;
                  if (enableDay !== day && frequency === WEEKLY)
                    return {
                      disabled: true,
                    };
                }}
              />
            )}
          />
          <Controller
            control={control}
            name="endDate"
            render={({
              field: { onChange, name, value },
              // fieldState: { invalid, isDirty }, //optional
              // formState: { errors }, //optional, but necessary if you want to show an error message
            }) => (
              <DatePicker
                minDate={new DateObject()}
                placeholder="End Date"
                value={value.endDate}
                range
                onChange={(startDate) => {
                  onChange(handleChangeDate(name, value));
                  console.log(getAllDatesInRange(startDate));
                }}
                mapDays={({ date }) => {
                  let enableDay = date.weekDay.name;
                  if (enableDay !== day && frequency === WEEKLY)
                    return {
                      disabled: true,
                    };
                }}
              />
            )}
          />
        </div>
        {/* <DatePicker
          minDate={new DateObject().date}
          value={value.endDate}
          onChange={handleChangeDate}
          name="endDate"
          mapDays={({ date }) => {
            let enableDay = date.weekDay.name;
            if (enableDay !== day && frequency === WEEKLY)
              return {
                disabled: true,
              };
          }}
        /> */}
      </div>
      <div>
        <DatePicker
          disableDayPicker
          format="HH:mm"
          plugins={[<TimePicker hideSeconds />]}
        />
        <DatePicker
          disableDayPicker
          format="HH:mm"
          plugins={[<TimePicker hideSeconds />]}
        />
      </div>
      <button>Cancelar</button>
      <button>Continuar</button>
      {/* <Calendar
        value={value}
        onChange={setValue}
        minDate={new DateObject().toFirstOfMonth()}
        maxDate={new DateObject().toLastOfMonth()}
        mapDays={({ date }) => {
          let enableDay = date.weekDay.name;
          if (enableDay !== day && frequency === WEEKLY)
            return {
              disabled: true,
            };
        }}
      />{" "} */}
    </>
  );
};
