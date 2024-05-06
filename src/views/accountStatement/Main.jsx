import { helper as $h, keyValue as kv } from "@/utils";
import { Fragment, useEffect, useState } from "react";
import { Litepicker, Lucide } from "@/base-components";
import { ReactTabulator, reactFormatter } from "react-tabulator";
import { getAccountStatement, saveDateRange } from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";

import Select from "react-select";
import moment from "moment";

const Main = () => {
  function InitialDateRange() {
    var date = new Date();
    // last 7 days date
    var startDate = moment(date).subtract(7, "days").format("YYYY-MM-DD");
    // todays date
    var endDate = moment(new Date()).format("YYYY-MM-DD");
    return `${startDate} - ${endDate}`;
  }

  const { accountStatement, dateRange } = useSelector(
    (state) => state.AccountStatementReducer
  );

  const [getDateRange, setDateRange] = useState(
    dateRange === "" ? InitialDateRange() : dateRange
  );

  const [getCurrentPage, setCurrentPage] = useState(1);

  const [getPerPage, setPerPage] = useState({ value: 10, label: "10" });
  const dispatch = useDispatch();

  useEffect(() => {
    let param = `?perPage=${getPerPage.value}&page=${getCurrentPage}`;
    var date = getDateRange.split(" - ");
    var startDate = moment(date[0]).format("MM/DD/YYYY");
    var endDate = moment(date[1]).format("MM/DD/YYYY");
    param += `&startDate=${startDate}&endDate=${endDate}`;
    dispatch(getAccountStatement(param));
    dispatch(saveDateRange(getDateRange));
  }, [dispatch, getCurrentPage]);

  const columns = [
    {
      title: "TransDate",
      field: "TransDate",

      formatter: reactFormatter(<TransDateFormatter />),
    },
    {
      title: "DueDate",
      field: "DueDate",

      formatter: reactFormatter(<DueDateFormatter />),
    },
    {
      title: "InvoiceId",
      field: "InvoiceId",
    },
    {
      title: "Description",
      field: "Description",

      width: 200,
    },

    {
      title: "Debit Amount",
      field: "DebitAmount",

      formatter: reactFormatter(<DebitAmountFormatter />),
    },

    {
      title: "Credit Amount",
      field: "CreditAmount",

      formatter: reactFormatter(<CreditAmountFormatter />),
    },

    {
      title: "Balance Amount",
      field: "BalanceAmount",

      formatter: reactFormatter(<BalanceAmountFormatter />),
    },
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
    var date = getDateRange.split(" - ");
    var startDate = moment(date[0]).format("MM/DD/YYYY");
    var endDate = moment(date[1]).format("MM/DD/YYYY");
    param += `&startDate=${startDate}&endDate=${endDate}`;
    if (getCurrentPage !== 1) {
      setCurrentPage(1);
    } else {
      dispatch(getAccountStatement(param));
      dispatch(saveDateRange(getDateRange));
    }
  };

  const handleResetFilter = () => {
    let param = `?perPage=${getPerPage.value}&page=1`;
    // find last year date
    var date = new Date();

    var startDate = moment(date).subtract(7, "days").format("MM/DD/YYYY");

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
      dispatch(saveDateRange(`${newformatStartDate} - ${newformatEndDate}`));
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
      dispatch(saveDateRange(getDateRange));
    }
  };

  return (
    <Fragment>
      <div className="intro-y flex flex-col sm:flex-row items-center mt-8">
        <h2 className="text-lg font-medium mr-auto">Account Statement</h2>
      </div>
      <div className="intro-y box p-5 mt-5 ">
        <div className="flex flex-col sm:flex-row sm:items-end xl:items-start mb-9">
          <form id="tabulator-html-filter-form" className="xl:flex sm:mr-auto">
            <div className="sm:flex items-center sm:mr-4">
              <label className="text-gray-600 mb-3 sm:mb-0 mr-2">
                Date Range
              </label>
              <Litepicker
                value={getDateRange}
                placeholder="Search By Date Placed"
                onChange={setDateRange}
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
                    years: true,
                  },
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
              <div className="text-base font-medium mt-1 mr-2">
                Open Balance
              </div>
              <div className="text-2xl font-bold">
                {accountStatement
                  ? $h.formatCurrency(accountStatement.OpenBalance)
                  : "0.00"}
              </div>

              <div className="text-base font-medium mt-1 mr-2 ml-2">
                Close Balance
              </div>
              <div className="text-2xl font-bold">
                {accountStatement
                  ? $h.formatCurrency(accountStatement.CloseBalance)
                  : "0.00"}
              </div>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto scrollbar-hidden">
          <ReactTabulator
            columns={columns}
            data={accountStatement ? accountStatement.List : []}
            options={{
              responsiveLayout: true,
            }}
          />
        </div>
        {!$h.isNullObject(accountStatement) &&
        accountStatement.hasOwnProperty("List") ? (
          <div className="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center mt-2">
            <nav className="w-full sm:w-auto sm:mr-auto">
              <ul className="pagination">
                {getCurrentPage > 1 ? (
                  <>
                    <li className="page-item">
                      <a
                        className="page-link"
                        href="#123"
                        onClick={() => setCurrentPage(1)}
                      >
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
                {getPerPage.value * getCurrentPage <=
                accountStatement?.TotalRecords ? (
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
                            Math.ceil(
                              accountStatement.TotalRecords / getPerPage.value
                            )
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
