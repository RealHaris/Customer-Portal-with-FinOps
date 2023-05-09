import { helper as $h, keyValue as kv } from "@/utils";
import { Fragment, useEffect, useState } from "react";
import { Litepicker, Lucide } from "@/base-components";
import { ReactTabulator, reactFormatter } from "react-tabulator";
import { useDispatch, useSelector } from "react-redux";

import Select from "react-select";
import { getAccountStatement } from "../../store/actions";
import moment from "moment";

const Main = () => {
  function InitialDateRange() {
    var date = new Date();
    var lastYear = date.getFullYear() - 1;
    var startDate = moment(`${lastYear}-01-01`).format("YYYY-MM-DD");
    var endDate = moment(new Date()).format("YYYY-MM-DD");
    return `${startDate} - ${endDate}`;
  }

  const [getDateRange, setDateRange] = useState(InitialDateRange);

  const [getCurrentPage, setCurrentPage] = useState(1);

  const [getPerPage, setPerPage] = useState({ value: 10, label: "10" });
  const dispatch = useDispatch();

  const { accountStatement, error, loading, fetched } = useSelector(
    (state) => state.AccountStatementReducer
  );

  useEffect(() => {
    // var params = `?perPage=10&page=1&startDate=1/19/2021&endDate=1/23/2023`;

    let param = `?perPage=${getPerPage.value}&page=${getCurrentPage}`;
    var date = getDateRange.split(" - ");
    var startDate = moment(date[0]).format("MM/DD/YYYY");
    var endDate = moment(date[1]).format("MM/DD/YYYY");
    param += `&startDate=${startDate}&endDate=${endDate}`;
    dispatch(getAccountStatement(param));
  }, [dispatch, getCurrentPage]);

  // useEffect(() => {
  //   console.log("getPerPage", getPerPage, getCurrentPage);

  //   let param = `?perPage=${getPerPage.value}&page=${getCurrentPage}`;
  //   var date = getDateRange.split(" - ");
  //   var startDate = moment(date[0]).format("MM/DD/YYYY");
  //   var endDate = moment(date[1]).format("MM/DD/YYYY");

  // }, [getCurrentPage]);

  // useEffect(() => {
  //   if (accountStatement) {
  //     console.log("account Statement ", accountStatement);
  //   }
  // }, [accountStatement]);

  // const list = [
  //   {
  //     TransDate: "2021-10-05T12:00:00",
  //     DueDate: "2021-10-15T12:00:00",
  //     InvoiceId: "I30008760",
  //     Description: "I30008760 - S2185242 - Robert Amaro",
  //     DebitAmount: 13.23,
  //     CreditAmount: 0,
  //     BalanceAmount: 13.23
  //   },
  //   {
  //     TransDate: "2021-10-08T12:00:00",
  //     DueDate: "2021-10-15T12:00:00",
  //     InvoiceId: "I30009133",
  //     Description: "I30009133 - S2185613 - Robert Amaro",
  //     DebitAmount: 10.84,
  //     CreditAmount: 0,
  //     BalanceAmount: 24.07
  //   },
  //   {
  //     TransDate: "2021-10-12T12:00:00",
  //     DueDate: "2021-10-12T12:00:00",
  //     InvoiceId: "",
  //     Description: "Payment",
  //     DebitAmount: 0,
  //     CreditAmount: -13.23,
  //     BalanceAmount: 10.84
  //   },
  //   {
  //     TransDate: "2021-10-12T12:00:00",
  //     DueDate: "2021-10-15T12:00:00",
  //     InvoiceId: "I30009371",
  //     Description: "I30009371 - S2185855 - Robert Amaro",
  //     DebitAmount: 13.21,
  //     CreditAmount: 0,
  //     BalanceAmount: 24.05
  //   },
  //   {
  //     TransDate: "2021-10-13T12:00:00",
  //     DueDate: "2021-10-13T12:00:00",
  //     InvoiceId: "",
  //     Description: "Payment",
  //     DebitAmount: 0,
  //     CreditAmount: -10.84,
  //     BalanceAmount: 13.21
  //   },
  //   {
  //     TransDate: "2021-11-04T12:00:00",
  //     DueDate: "2021-11-04T12:00:00",
  //     InvoiceId: "",
  //     Description: "Payment",
  //     DebitAmount: 0,
  //     CreditAmount: -13.21,
  //     BalanceAmount: 0
  //   },
  //   {
  //     TransDate: "2021-12-31T12:00:00",
  //     DueDate: "2021-12-31T12:00:00",
  //     InvoiceId: "",
  //     Description: "Boots - Amaro, Robert",
  //     DebitAmount: 0,
  //     CreditAmount: -21.28,
  //     BalanceAmount: -21.28
  //   },
  //   {
  //     TransDate: "2022-01-02T12:00:00",
  //     DueDate: "2022-01-02T12:00:00",
  //     InvoiceId: "",
  //     Description: "Boots - Amaro, Robert",
  //     DebitAmount: 0,
  //     CreditAmount: -21.28,
  //     BalanceAmount: -42.56
  //   },
  //   {
  //     TransDate: "2022-01-02T12:00:00",
  //     DueDate: "2022-01-02T12:00:00",
  //     InvoiceId: "",
  //     Description: "Boots - Amaro, Robert",
  //     DebitAmount: 21.28,
  //     CreditAmount: 0,
  //     BalanceAmount: -21.28
  //   },
  //   {
  //     TransDate: "2022-01-09T12:00:00",
  //     DueDate: "2022-01-09T12:00:00",
  //     InvoiceId: "",
  //     Description: "Boots - Amaro, Robert",
  //     DebitAmount: 0,
  //     CreditAmount: -21.28,
  //     BalanceAmount: -42.56
  //   },
  //   {
  //     TransDate: "2022-01-16T12:00:00",
  //     DueDate: "2022-01-16T12:00:00",
  //     InvoiceId: "",
  //     Description: "Boots - Amaro, Robert",
  //     DebitAmount: 0,
  //     CreditAmount: -21.28,
  //     BalanceAmount: -63.84
  //   },
  //   {
  //     TransDate: "2022-01-23T12:00:00",
  //     DueDate: "2022-01-23T12:00:00",
  //     InvoiceId: "",
  //     Description: "Boots - Amaro, Robert",
  //     DebitAmount: 0,
  //     CreditAmount: -21.28,
  //     BalanceAmount: -85.12
  //   },
  //   {
  //     TransDate: "2022-01-25T12:00:00",
  //     DueDate: "2022-01-25T12:00:00",
  //     InvoiceId: "",
  //     Description: "Record Employee  Boot Cost Portion",
  //     DebitAmount: 106.91,
  //     CreditAmount: 0,
  //     BalanceAmount: 21.79
  //   },
  //   {
  //     TransDate: "2022-01-30T12:00:00",
  //     DueDate: "2022-01-30T12:00:00",
  //     InvoiceId: "",
  //     Description: "Boots - Amaro, Robert",
  //     DebitAmount: 0,
  //     CreditAmount: -21.28,
  //     BalanceAmount: 0.51
  //   },
  //   {
  //     TransDate: "2022-05-03T12:00:00",
  //     DueDate: "2022-05-03T12:00:00",
  //     InvoiceId: "",
  //     Description: "Payment",
  //     DebitAmount: 0,
  //     CreditAmount: -0.51,
  //     BalanceAmount: 0
  //   },
  //   {
  //     TransDate: "2022-06-09T12:00:00",
  //     DueDate: "2022-07-15T12:00:00",
  //     InvoiceId: "I30031547",
  //     Description: "I30031547 - S2204772 - Robert Amaro",
  //     DebitAmount: 5.41,
  //     CreditAmount: 0,
  //     BalanceAmount: 5.41
  //   },
  //   {
  //     TransDate: "2022-07-06T12:00:00",
  //     DueDate: "2022-07-06T12:00:00",
  //     InvoiceId: "",
  //     Description: "Payment",
  //     DebitAmount: 0,
  //     CreditAmount: -5.41,
  //     BalanceAmount: 0
  //   },
  //   {
  //     TransDate: "2022-07-27T12:00:00",
  //     DueDate: "2022-08-15T12:00:00",
  //     InvoiceId: "I30035472",
  //     Description: "I30035472 - S2208174 - Robert Amaro",
  //     DebitAmount: 10.84,
  //     CreditAmount: 0,
  //     BalanceAmount: 10.84
  //   },
  //   {
  //     TransDate: "2022-08-01T12:00:00",
  //     DueDate: "2022-08-01T12:00:00",
  //     InvoiceId: "",
  //     Description: "S2208556, Cash payment",
  //     DebitAmount: 0,
  //     CreditAmount: -1.08,
  //     BalanceAmount: 9.76
  //   },
  //   {
  //     TransDate: "2022-08-01T12:00:00",
  //     DueDate: "2022-09-15T12:00:00",
  //     InvoiceId: "I30035872",
  //     Description: "I30035872 - S2208556 - Robert Amaro",
  //     DebitAmount: 1.08,
  //     CreditAmount: 0,
  //     BalanceAmount: 10.84
  //   },
  //   {
  //     TransDate: "2022-08-16T12:00:00",
  //     DueDate: "1900-01-01T12:00:00",
  //     InvoiceId: "I30035472",
  //     Description: "",
  //     DebitAmount: 0,
  //     CreditAmount: -10.84,
  //     BalanceAmount: 0
  //   },
  //   {
  //     TransDate: "2022-08-16T12:00:00",
  //     DueDate: "1900-01-01T12:00:00",
  //     InvoiceId: "I30035472",
  //     Description: "",
  //     DebitAmount: 10.84,
  //     CreditAmount: 0,
  //     BalanceAmount: 10.84
  //   },
  //   {
  //     TransDate: "2022-08-16T12:00:00",
  //     DueDate: "2022-08-16T12:00:00",
  //     InvoiceId: "",
  //     Description: "Payment",
  //     DebitAmount: 0,
  //     CreditAmount: -10.84,
  //     BalanceAmount: 0
  //   },
  //   {
  //     TransDate: "2022-10-05T12:00:00",
  //     DueDate: "2022-10-05T12:00:00",
  //     InvoiceId: "",
  //     Description: "S2213055, Cash payment",
  //     DebitAmount: 0,
  //     CreditAmount: -5.41,
  //     BalanceAmount: -5.41
  //   },
  //   {
  //     TransDate: "2022-10-05T12:00:00",
  //     DueDate: "2022-11-15T12:00:00",
  //     InvoiceId: "I30041607",
  //     Description: "I30041607 - S2213055 - Robert Amaro",
  //     DebitAmount: 5.41,
  //     CreditAmount: 0,
  //     BalanceAmount: 0
  //   }
  // ];

  const columns = [
    {
      title: "TransDate",
      field: "TransDate",

      formatter: reactFormatter(<TransDateFormatter />)
    },
    {
      title: "DueDate",
      field: "DueDate",

      formatter: reactFormatter(<DueDateFormatter />)
    },
    {
      title: "InvoiceId",
      field: "InvoiceId"
    },
    {
      title: "Description",
      field: "Description",

      width: 200
    },

    {
      title: "DebitAmount",
      field: "DebitAmount",

      formatter: reactFormatter(<DebitAmountFormatter />)
    },

    {
      title: "CreditAmount",
      field: "CreditAmount",

      formatter: reactFormatter(<CreditAmountFormatter />)
    },

    {
      title: "BalanceAmount",
      field: "BalanceAmount",

      formatter: reactFormatter(<BalanceAmountFormatter />)
    }
  ];

  function TransDateFormatter(props) {
    const TransDate = props.cell._cell.row.data.TransDate;
    if (!TransDate) {
      return "";
    } else {
      return <span>{moment(TransDate).format("DD-MM-YYYY")}</span>;
    }
  }

  function DueDateFormatter(props) {
    const DueDate = props.cell._cell.row.data.DueDate;
    if (!DueDate) {
      return "";
    } else {
      return <span>{moment(DueDate).format("DD-MM-YYYY")}</span>;
    }
  }

  function DebitAmountFormatter(props) {
    const DebitAmount = props.cell._cell.row.data.DebitAmount;
    if (!DebitAmount) {
      return "";
    } else {
      return <span> {$h.formatCurrency(DebitAmount)}</span>;
    }
  }

  function CreditAmountFormatter(props) {
    const CreditAmount = props.cell._cell.row.data.CreditAmount;
    if (!CreditAmount) {
      return "";
    } else {
      return <span> {$h.formatCurrency(CreditAmount)}</span>;
    }
  }

  function BalanceAmountFormatter(props) {
    const BalanceAmount = props.cell._cell.row.data.BalanceAmount;
    if (!BalanceAmount) {
      return "";
    } else {
      return <span> {$h.formatCurrency(BalanceAmount)}</span>;
    }
  }

  const handleFilterFunction = () => {
    let param = `?perPage=${getPerPage.value}&page=1`;
    // var date = getDateRange.split("-");
    // console.log("date", date);
    // var date = "2023-05-10 - 2023-06-14";
    var date = getDateRange.split(" - ");
    console.log("date", date);

    var startDate = moment(date[0]).format("MM/DD/YYYY");
    var endDate = moment(date[1]).format("MM/DD/YYYY");
    param += `&startDate=${startDate}&endDate=${endDate}`;
    if (getCurrentPage !== 1) {
      setCurrentPage(1);
    } else {
      dispatch(getAccountStatement(param));
    }
  };

  const handleResetFilter = () => {
    let param = `?perPage=${getPerPage.value}&page=1`;
    // find last year date
    var date = new Date();
    var lastYear = date.getFullYear() - 1;
    var startDate = moment(`${lastYear}-01-01`).format("MM/DD/YYYY");
    // todays date
    var endDate = moment(new Date()).format("MM/DD/YYYY");
    param += `&startDate=${startDate}&endDate=${endDate}`;
    // change start date and end date format to this format 2021-01-01 - 2021-06-14
    var newformatStartDate = moment(startDate).format("YYYY-MM-DD");
    var newformatEndDate = moment(endDate).format("YYYY-MM-DD");
    setDateRange(`${newformatStartDate} - ${newformatEndDate}`);
    if (getCurrentPage !== 1) {
      setCurrentPage(1);
    } else {
      dispatch(getAccountStatement(param));
    }
  };

  const onSelectPerPage = (e) => {
    setPerPage({ value: `${e.value}`, label: `${e.value}` });
    var splitDate = getDateRange.split(" - ");
    // convert date to this format mm/dd/yyyy
    var startDate = moment(splitDate[0]).format("MM/DD/YYYY");
    var endDate = moment(splitDate[1]).format("MM/DD/YYYY");
    let param = `?perPage=${e.value}&page=1&startDate=${startDate}&endDate=${endDate}`;
    if (getCurrentPage !== 1) {
      setCurrentPage(1);
    } else {
      dispatch(getAccountStatement(param));
    }
  };

  return (
    <Fragment>
      <div className="intro-y flex flex-col sm:flex-row items-center mt-8">
        <h2 className="text-lg font-medium mr-auto">ACCOUNT STATEMENT</h2>
      </div>
      <div className="intro-y box p-5 mt-5 ">
        <div className="flex flex-col sm:flex-row sm:items-end xl:items-start mb-9">
          <form id="tabulator-html-filter-form" className="xl:flex sm:mr-auto">
            <div className="sm:flex items-center sm:mr-4">
              <label className="text-gray-600 mb-3 sm:mb-0 mr-2">Date Range</label>
              <Litepicker
                value={getDateRange}
                placeholder="Search By Date Placed"
                onChange={setDateRange}
                // onChange={(date) => {
                //   console.log(date);
                // }}
                options={{
                  autoApply: false,
                  singleMode: false,
                  numberOfColumns: 2,
                  numberOfMonths: 2,
                  showWeekNumbers: true,
                  dropdowns: {
                    minYear: 1990,
                    maxYear: null,
                    months: true,
                    years: true
                  }
                }}
                className="form-control w-56 block mx-auto"
              />
            </div>
            <div className="mt-2 xl:mt-0">
              <button
                id="tabulator-html-filter-go"
                type="button"
                className="btn btn-primary w-full sm:w-16 mr-3"
                onClick={() => handleFilterFunction()}
              >
                Filter
              </button>
              <button
                id="tabulator-html-filter-reset"
                type="button"
                className="btn btn-secondary w-full sm:w-16 mt-2 sm:mt-0 sm:ml-1"
                onClick={() => handleResetFilter()}
              >
                Reset
              </button>
            </div>
          </form>
          <div className="flex mt-5 sm:mt-0 flex-row">
            <div className="text-center sm:text-right xl:text-left mt-3 xl:mt-0 xl:ml-auto flex-row flex">
              <div className="text-base font-medium mt-1 mr-2">Open Balance</div>
              <div className="text-2xl font-bold">
                {accountStatement ? $h.formatCurrency(accountStatement.OpenBalance) : "0.00"}
              </div>

              <div className="text-base font-medium mt-1 mr-2 ml-2">Close Balance</div>
              <div className="text-2xl font-bold">
                {accountStatement ? $h.formatCurrency(accountStatement.CloseBalance) : "0.00"}
              </div>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto scrollbar-hidden">
          <ReactTabulator
            columns={columns}
            data={accountStatement ? accountStatement.List : []}
            options={{
              responsiveLayout: true
            }}
          />
        </div>
        {!$h.isNullObject(accountStatement) && accountStatement.hasOwnProperty("List") ? (
          <div className="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center mt-2">
            <nav className="w-full sm:w-auto sm:mr-auto">
              <ul className="pagination">
                {getCurrentPage > 1 ? (
                  <>
                    <li className="page-item">
                      <a className="page-link" href="#123" onClick={() => setCurrentPage(1)}>
                        <Lucide icon="ChevronsLeft" className="w-4 h-4" />
                      </a>
                    </li>
                    <li className="page-item">
                      <a
                        className="page-link"
                        href="#"
                        onClick={() => setCurrentPage(getCurrentPage - 1)}
                      >
                        <Lucide icon="ChevronLeft" className="w-4 h-4" />
                      </a>
                    </li>

                    <li className="page-item">
                      {/* <a className="page-link" href="#" onClick ={setCurrentPage(accountStatement.nextPage)} > */}

                      <a
                        className="page-link"
                        href="#"
                        onClick={() => setCurrentPage(getCurrentPage - 1)}
                      >
                        {getCurrentPage - 1}
                      </a>
                    </li>
                  </>
                ) : null}
                <li className="page-item active">
                  <a className="page-link" href="#">
                    {getCurrentPage}
                  </a>
                </li>
                {getPerPage.value * getCurrentPage <= accountStatement?.TotalRecords ? (
                  <>
                    <li className="page-item">
                      {/* <a className="page-link" href="#" onClick ={setCurrentPage(accountStatement.nextPage)} > */}

                      <a
                        className="page-link"
                        href="#"
                        onClick={() => setCurrentPage(getCurrentPage + 1)}
                      >
                        {getCurrentPage + 1}
                      </a>
                    </li>

                    <li className="page-item">
                      <a
                        className="page-link"
                        href="#"
                        onClick={() => setCurrentPage(getCurrentPage + 1)}
                      >
                        <Lucide icon="ChevronRight" className="w-4 h-4" />
                      </a>
                    </li>

                    <li className="page-item">
                      <a
                        className="page-link"
                        href="#123"
                        onClick={() =>
                          setCurrentPage(
                            Math.ceil(accountStatement.TotalRecords / getPerPage.value)
                          )
                        }
                      >
                        <Lucide icon="ChevronsRight" className="w-4 h-4" />
                      </a>
                    </li>
                  </>
                ) : null}
              </ul>
            </nav>
            <Select
              defaultValue={getPerPage}
              onChange={(e) => {
                onSelectPerPage(e);
              }}
              options={kv.optionsPerPage}
            />
          </div>
        ) : null}
      </div>
    </Fragment>
  );
};

export default Main;
